import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LeftMenu from "../layouts/leftMenu/LeftMenu";
import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";
import { useState, useEffect } from "react";
import jwt from "jwt-decode";
import "react-datepicker/dist/react-datepicker.css";

function Pages() {
  const htmlElement = document.querySelector("html");
  htmlElement.classList.remove("not-adminPages");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    console.log(sessionToken);
    if (sessionToken) {
      const tokenData = jwt(sessionToken);
      console.log(tokenData.role !== "admin");
      if (tokenData.sub !== "admin") {
        navigate("/login", { replace: true });
      } else {
        setToken(tokenData);
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div>
      <LeftMenu />
      <div className="content">
        <Header token={token} />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Pages;
