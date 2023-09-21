const API = {
  URL:
    process.env.NODE_ENV == "development"
      ? "http://0.0.0.0:"
      : "http://ec2-3-85-12-62.compute-1.amazonaws.com/api",
  PORT: "8000",
};

const ENDPOINTS = {
  ROOT: "/api",
  FILESIZE: "/filesize/",
  UPLOAD: "/upload/",
};

export const FULL_API_URL =
  process.env.NODE_ENV == "development"
    ? API.URL + API.PORT + ENDPOINTS.ROOT
    : API.URL;
export const API_UPLOAD_URL = FULL_API_URL + ENDPOINTS.UPLOAD;
