import "./App.scss";
import "./assets/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Pages from "./components/pages/Pages";
import { useEffect, useState } from "react";
import Users from "./components/pages/users/Users";
import UserCreate from "./components/pages/users/userCreate/UserCreate";
import UserView from "./components/pages/users/userView/UserView";
import Menu from "./components/pages/menu/Menu";
import MenuCreate from "./components/pages/menu/menuCreate/MenuCreate";
import MenuView from "./components/pages/menu/menuView/MenuView";
import LangSetting from "./components/pages/langSetting/LangSetting";
import LangSettingCreate from "./components/pages/langSetting/langSettingCreate/LangSettingCreate";
import LangSettingView from "./components/pages/langSetting/langSettingView/LangSettingView";
import News from "./components/pages/news/News";
import AdminCourses from "./components/pages/adminCourses/AdminCourses";
import AdminCoursesCreate from "./components/pages/adminCourses/adminCoursesCreate/AdminCoursesCreate";
import AdminCoursesView from "./components/pages/adminCourses/adminCoursesView/AdminCoursesView";
// import Site from "./components/site/Site";
import NewsCreate from "./components/pages/news/newsCreate/NewsCreate";
import NewsView from "./components/pages/news/newsView/NewsView";
import CoursesCategoryView from "./components/pages/coursesCategory/coursesCategoryView/CoursesCategoryView";
import CoursesCategory from "./components/pages/coursesCategory/CoursesCategory";
import CoursesCategoryCreate from "./components/pages/coursesCategory/coursesCategoryCreate/CoursesCategoryCreate";

import // Courses,
// Course,
// Home,
// About,
// Contact,
// CalendarPage,
"./components/pages";
import $ from "jquery";
import { NotificationContainer } from "react-notifications";

import { useTranslation } from "react-i18next";
import { ScrollTop } from "./components";
import ProductsAdmin from "./components/pages/ProductsAdmin/ProductsAdmin";
import ProductsCreate from "./components/pages/ProductsAdmin/ProductsCreate";
import ProductsView from "./components/pages/ProductsAdmin/ProductsView";
import axios from "axios";

function App() {
  const { t, i18n } = useTranslation();
  setTimeout(function () {
    if ($("#spinner").length > 0) {
      $("#spinner").removeClass("show");
    }
  }, 1);

  return (
    <div className="wrapper">
      <div
        id="spinner"
        className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <ScrollTop />

      <Routes>
        {/* <Route path="/" element={<Site />}> */}
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="courses/:slug" element={<Course />} /> */}
        {/* <Route path="courses" element={<Courses />} /> */}
        {/* <Route path="about" element={<About />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}
        {/* <Route path="calendar" element={<CalendarPage />} /> */}
        {/* </Route> */}
        <Route path="/login" element={<Auth />} />

        <Route path="/" element={<Pages />}>
          {/* <Route index element={<Home />} /> */}

          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users/view/:id" element={<UserView />} />

          <Route path="menu" element={<Menu />} />
          <Route path="menu/create" element={<MenuCreate />} />
          <Route path="menu/view/:id" element={<MenuView />} />

          <Route path="product" element={<ProductsAdmin />} />
          <Route path="product/create" element={<ProductsCreate />} />
          <Route path="product/view/:id" element={<ProductsView />} />

          <Route path="setting" element={<LangSetting />} />
          <Route path="setting/create" element={<LangSettingCreate />} />
          <Route path="setting/view/:id" element={<LangSettingView />} />

          <Route path="news" element={<News />} />
          <Route path="news/create" element={<NewsCreate />} />
          <Route path="news/view/:id" element={<NewsView />} />

          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/create" element={<AdminCoursesCreate />} />
          <Route path="courses/view/:id" element={<AdminCoursesView />} />

          <Route path="courses-category" element={<CoursesCategory />} />
          <Route
            path="courses-category/create"
            element={<CoursesCategoryCreate />}
          />
          <Route
            path="courses-category/view/:id"
            element={<CoursesCategoryView />}
          />
        </Route>
      </Routes>

      <NotificationContainer />
    </div>
  );
}

export default App;
