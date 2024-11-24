import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
});
