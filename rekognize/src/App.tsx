import React from "react";
import "./App.css";
import { Box, Input, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { API_UPLOAD_URL } from "./consts";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<File>();
  const [error, setError] = React.useState<string>("");

  const [celebrity, setCelebrity] = React.useState<Array<string>>();

  React.useEffect(() => {
    console.log(celebrity);
    if (celebrity?.[0].includes("Error")) {
      setError(celebrity[0]);
    }
  }, [celebrity]);

  const sendRequest = async (blob: Blob) => {
    setError("");
    const formData = new FormData();
    formData.append("file", blob);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(API_UPLOAD_URL, formData, config);
    console.log(response["data"]);
    setCelebrity(response["data"]);
    setLoading(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(file);

    const reader = new FileReader();
    reader.onload = () => {
      const blob = new Blob([reader.result as ArrayBuffer], {
        type: file?.type,
      });
      sendRequest(blob);
    };
    reader.readAsArrayBuffer(file as Blob);
  };

  return (
    <>
      <Typography sx={{ fontWeight: 500, py: 4 }}>
        Upload an image and let Rekognize do the magic!
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        component="form"
        onSubmit={(event) => {
          setLoading(true);
          handleSubmit(event);
        }}
      >
        <Input
          type="file"
          inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFile(event.target.files?.[0])
          }
        />
        <LoadingButton loading={loading} type="submit">
          Rekognize
        </LoadingButton>
        {celebrity && !loading && (
          <Typography color={error && "#ff6347"} variant="h3">
            {celebrity.length > 1 ? celebrity.join(", ") : celebrity[0]}
          </Typography>
        )}
      </Box>
    </>
  );
}

export default App;
