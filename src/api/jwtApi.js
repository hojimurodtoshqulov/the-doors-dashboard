import axios from "axios";
import { baseUrl } from "../shared/constants";

const token = sessionStorage.getItem("token");

console.log(token);

export const jwtApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
