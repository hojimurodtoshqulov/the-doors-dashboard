import axios from "axios";
import { baseUrl } from "../shared/constants";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

const sessionToken = sessionStorage.getItem("token");


export const useJwtApi = () => {
  const { token } = useContext(AuthContext);

  console.log(token);
  const jwtApi = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || sessionToken}`,
    },
  });

  return { jwtApi };
};
