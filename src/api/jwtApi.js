import axios from "axios";
import { baseUrl } from "../shared/constants";

const jwtApi = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  },
});
