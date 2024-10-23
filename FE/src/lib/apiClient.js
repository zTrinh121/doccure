import { Axios } from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


export const api = Axios.create({
  baseURL: apiUrl,
});
