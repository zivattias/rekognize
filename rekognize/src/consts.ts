const API = {
    URL: "http://0.0.0.0:",
    PORT: "8000",
}

const ENDPOINTS = {
    ROOT: "/",
    FILESIZE: "/filesize/",
    UPLOAD: "/upload/"
}

export const FULL_API_URL = API.URL + API.PORT
export const API_UPLOAD_URL = FULL_API_URL + ENDPOINTS.UPLOAD