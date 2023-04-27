from typing import Annotated, Optional
from fastapi import FastAPI, File, UploadFile, status, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from uuid import uuid4

import boto3
import os

load_dotenv()

KB = 1024
MB = 1024 * KB

SUPPORTED_FILES = {
    "image/jpg": "jpg",
    "image/png": "png",
    "image/jpeg": "jpeg",
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

s3 = boto3.resource("s3")
bucket = s3.Bucket(f"{os.getenv('S3_BUCKET_NAME')}")
client = boto3.client(
    "rekognition",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("AWS_SECRET_KEY"),
    region_name=os.getenv("REGION"),
)


async def detect_celebs(
    is_s3: bool = False,
    image_key: Optional[str] = None,
    image_data: Optional[str] = None,
) -> list[str]:
    response = (
        client.recognize_celebrities(
            Image={
                "S3Object": {"Bucket": os.getenv("S3_BUCKET_NAME"), "Name": image_key}
            }
        )
        if is_s3
        else client.recognize_celebrities(Image={"Bytes": image_data})
    )

    return [celebrity["Name"] for celebrity in response["CelebrityFaces"]]


@app.get("/")
def root():
    return {"urls": "/upload_image"}


@app.post("/filesize/")
async def file_size(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}


@app.post("/upload/")
async def upload_file(file: Optional[UploadFile] = None):
    if not file or file.size == 0 or file.content_type not in SUPPORTED_FILES:
        return Response(status_code=status.HTTP_400_BAD_REQUEST)

    if file.size <= 5 * MB:
        image_data_bytes = await file.read()
        celebrities = await detect_celebs(image_data=image_data_bytes)

    else:
        uuid = str(uuid4())
        file_key = f"{uuid}.{SUPPORTED_FILES[file.content_type]}"
        bucket.put_object(Key=file_key, Body=file.file.read())
        celebrities = await detect_celebs(is_s3=True, image_key=file_key)

    return celebrities


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
