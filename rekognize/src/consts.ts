const API = {
    URL: process.env.NODE_ENV == "development" ? "http://0.0.0.0:" : "ec2-54-85-78-242.compute-1.amazonaws.com/api",
    PORT: process.env.NODE_ENV == "development" ? "8000" : "",
}

const ENDPOINTS = {
    ROOT: "/",
    FILESIZE: "/filesize/",
    UPLOAD: "/upload/"
}

export const FULL_API_URL = API.URL + API.PORT
export const API_UPLOAD_URL = FULL_API_URL + ENDPOINTS.UPLOAD
