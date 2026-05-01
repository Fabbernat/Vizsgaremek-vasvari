import axios from "axios"

export const BACKEND_URL = "http://localhost:3000"

const jwtToken = localStorage.getItem('token');

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
    }
})

export default apiClient;