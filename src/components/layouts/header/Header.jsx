import React from "react";
import s from "./Header.module.css";
import Img1 from "../../../assets/img/user.jpg";
import $ from "jquery";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header(props) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const sidebarClick = () => {
    $(".sidebar, .content").toggleClass("open");
    return false;
  };

  const LogOut = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <i className="fa fa-user-edit"></i>
        </h2>
      </a>
      <NavLink
        to="#"
        onClick={sidebarClick}
        className="sidebar-toggler flex-shrink-0"
      >
        <i className="fa fa-bars"></i>
      </NavLink>
      <form className="d-none d-md-flex ms-4">
        <input
          className="form-control bg-dark border-0"
          type="search"
          placeholder="Search"
        />
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <NavLink
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {/* <img className="rounded-circle me-lg-2" src={Img1} alt="" style={{width: "40px", height: "40px"}}/> */}
            <span className="d-none d-lg-inline-flex">LANG</span>
          </NavLink>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <NavLink
              to="#"
              className="dropdown-item"
              onClick={() => changeLanguage("ru")}
            >
              Ru
            </NavLink>
            <NavLink
              to="#"
              className="dropdown-item"
              onClick={() => changeLanguage("uz")}
            >
              Uz
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
