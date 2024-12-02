import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const Axios = axios.create({
  baseURL: `${apiUrl}/v1`,
  withCredentials: true,
});
