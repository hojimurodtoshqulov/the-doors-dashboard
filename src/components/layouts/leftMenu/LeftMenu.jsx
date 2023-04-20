import React from "react";
import s from "./LeftMenu.module.css";
import $ from "jquery";
import img1 from "../../../assets/img/user.jpg";
import { NavLink } from "react-router-dom";

function LeftMenu() {
  const handleClick = () => {
    $(".sidebar, .content").toggleClass("open");
    return false;
  };
  return (
    <div className={`${s.sidebar} sidebar pe-4 pb-3`}>
      <nav className={`${s.navbar} navbar px-2 py-4 bg-secondary navbar-dark`}>
        <div
          className="text-primary"
          onClick={handleClick}
          style={{
            position: "absolute",
            top: "2rem",
            right: "1rem",
            fontSize: "1.3rem",
            cursor: "pointer",
          }}
        >
          <i className="fa fa-regular fa-chevron-left"></i>
        </div>
        <NavLink to="/" className="navbar-brand mx-4 mb-3">
          {" "}
          <h3 className="text-primary">
            <i className="fa fa-user-edit me-2"></i>DarkPan
          </h3>
        </NavLink>

        <div className={`${s.navbar_nav} navbar-nav w-100`}>
          <NavLink to="/users" className={`${s.nav_link} nav-item nav-link`}>
            <i className="fa fa-solid fa-user me-2"></i>Users
          </NavLink>
          <NavLink to="/teacher" className={`${s.nav_link} nav-item nav-link`}>
            <i className="fa fa-solid fa-user me-2"></i>Teachers
          </NavLink>
          <NavLink to="/menu" className={`${s.nav_link} nav-item nav-link`}>
            <i className="fa fa-solid fa-bars me-2"></i>Menu
          </NavLink>
          <NavLink to="/news" className={`${s.nav_link} nav-item nav-link`}>
            <i className="fa fa-solid fa-th me-2"></i>News
          </NavLink>
          <NavLink to="/courses" className={`${s.nav_link} nav-item nav-link`}>
            <i className="fa fa-solid fa-th me-2"></i>Courses
          </NavLink>
          <NavLink
            to="/courses-category"
            className={`${s.nav_link} nav-item nav-link`}
          >
            <i className="fa fa-solid fa-th me-2"></i>Category
          </NavLink>

          {/* <div className="nav-item dropdown">
                    <a href="#" className={`${s.nav_link} nav-link ${s.dropdown_toggle} dropdown-toggle`} data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Elements</a>
                    <div className="dropdown-menu bg-transparent border-0">
                        <a href="button.html" className={` ${s.dropdown_item} dropdown-item`}>Buttons</a>
                        <a href="typography.html" className={` ${s.dropdown_item} dropdown-item`}>Typography</a>
                        <a href="element.html" className={` ${s.dropdown_item} dropdown-item`}>Other Elements</a>
                    </div>
                </div> */}
          {/* <a href="widget.html" className={`${s.nav_link} nav-item nav-link`}><i className="fa fa-th me-2"></i>Widgets</a> */}

          {/* <NavLink to="/widget" className={`${s.nav_link} nav-item nav-link`}><i className="fa fa-th me-2"></i>Widgets</NavLink> */}

          {/* <a href="form.html" className={`${s.nav_link} nav-item nav-link`}><i className="fa fa-keyboard me-2"></i>Forms</a>
                <a href="table.html" className={`${s.nav_link} nav-item nav-link`}><i className="fa fa-table me-2"></i>Tables</a>
                <a href="chart.html" className={`${s.nav_link} nav-item nav-link`}><i className="fa fa-chart-bar me-2"></i>Charts</a> */}

          {/* <div className="nav-item dropdown">
                    <NavLink to='#' className={`${s.nav_link} nav-link ${s.dropdown_toggle} dropdown-toggle`} data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>Pages</NavLink>
                    <div className="dropdown-menu bg-transparent border-0">
                        <NavLink to="signin" className={` ${s.dropdown_item} dropdown-item`} >Sign In</NavLink>
                        <NavLink to="signup" className={` ${s.dropdown_item} dropdown-item`} >Sign Up</NavLink>
                        <NavLink to="404" className={` ${s.dropdown_item} dropdown-item`} >404 Error</NavLink>
                        <NavLink to="blank" className={` ${s.dropdown_item} dropdown-item`} >Blank Page</NavLink>
                
                    </div>
                </div> */}
        </div>
      </nav>
    </div>
  );
}

export default LeftMenu;
