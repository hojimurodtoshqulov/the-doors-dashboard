import axios from "axios";
import { baseUrl } from "../shared/constants";

export const jwtApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
