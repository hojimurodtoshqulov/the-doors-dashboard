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
import OrderView from "./components/pages/menu/orderView/MenuView";
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

import Spiner from "./components/spinner";

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
import Showcase from "./components/pages/showcase/showcase";
import Work from "./components/pages/work/work";
import About from "./components/pages/about/about";
import VideoSubmit from "./components/pages/video/video";
import WorkShowcase from "./components/pages/work-showcase/workShowcase";
import ContactShowcase from "./components/pages/contactShowcase/contactShowcase";
import Comments from "./components/pages/comments/comments";
import CommentsCreate from "./components/pages/comments/commentsCreate";
import CommentsView from "./components/pages/comments/commentsView";
import Advantages from "./components/pages/advantages/advantages";
import AboutShowcase from "./components/pages/aboutShowcase/aboutShowcase";
import Partners from "./components/pages/partners/partners";
import PartnersCreate from "./components/pages/partners/partnersCreate";
import PartnersView from "./components/pages/partners/partnersView";
import Projects from "./components/pages/projects/projects";

function App() {
  const { t, i18n } = useTranslation();
  setTimeout(function () {
    if ($("#spinner").length > 0) {
      $("#spinner").removeClass("show");
    }
  }, 1);

  return (
    <div className="wrapper">
      <ScrollTop />
      <Spiner />
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

          {/*   <Route path="users" element={<Users />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users/view/:id" element={<UserView />} /> */}

          <Route path="order" element={<Menu />} />
          {/* <Route path="menu/create" element={<MenuCreate />} /> */}
          <Route path="order/:id" element={<OrderView />} />

          <Route path="product" element={<ProductsAdmin />} />
          <Route path="product/create" element={<ProductsCreate />} />
          <Route path="product/view/:id" element={<ProductsView />} />

          <Route path="showcase" element={<Showcase />} />
          <Route path="work-showcase" element={<WorkShowcase />} />
          <Route path="contact-showcase" element={<ContactShowcase />} />
          <Route path="about-showcase" element={<AboutShowcase />} />

          <Route path="work" element={<Work />} />

          <Route path="about" element={<About />} />
          <Route path="video" element={<VideoSubmit />} />

          <Route path="comments" element={<Comments />} />
          <Route path="comments/create" element={<CommentsCreate />} />
          <Route path="comments/view/:id" element={<CommentsView />} />

          <Route path="advantages" element={<Advantages />} />

          <Route path="partners" element={<Partners />} />
          <Route path="partners/create" element={<PartnersCreate />} />
          <Route path="partners/view/:id" element={<PartnersView />} />
          <Route path="projects" element={<Projects />} />

          {/* 
          <Route path="setting" element={<LangSetting />} />
          <Route path="setting/create" element={<LangSettingCreate />} />
          <Route path="setting/view/:id" element={<LangSettingView />} /> */}
          {/* 
          <Route path="news" element={<News />} />
          <Route path="news/create" element={<NewsCreate />} />
          <Route path="news/view/:id" element={<NewsView />} /> */}
          {/* 
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/create" element={<AdminCoursesCreate />} />
          <Route path="courses/view/:id" element={<AdminCoursesView />} /> */}

          {/*   <Route path="courses-category" element={<CoursesCategory />} />
          <Route
            path="courses-category/create"
            element={<CoursesCategoryCreate />}
          />
          <Route
            path="courses-category/view/:id"
            element={<CoursesCategoryView />}
          /> */}
        </Route>
      </Routes>

      <NotificationContainer />
    </div>
  );
}

export default App;
