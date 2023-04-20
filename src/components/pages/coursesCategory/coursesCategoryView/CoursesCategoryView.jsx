import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "../../../layouts/switch/Switch";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export default function CoursesCategoryView() {
  const [data, setData] = useState({
    title_ru: "",
    title_uz: "",
    status: false,
  });
  const params = useParams();
  const id = params.id;
  const navigation = useNavigate();
  const [lang, setLang] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}courses_category/get/${id}`)
      .then((res) => {
        setData(res.data.data);
      });

    // axios.get(`${process.env.REACT_APP_API_URL}lang/get`).then((res) => {
    //   setLang(res.data.data.result);
    // });
  }, []);
  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const lang = event.target.lang;
    // if (lang) {
    //   let nameIn = inputName + "_" + lang;
    //   setData((oldValue) => ({ ...oldValue, [nameIn]: inputValue }));
    // } else {
    // }
    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.title_ru.length > 0) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}courses_category/update/${id}`,
          data
        )
        .then((res) => {
          if (res.status === 200) {
            navigation("/admin/courses-category", { replace: true });
          }
        });
    } else {
      NotificationManager.warning(
        "Please fill in the fields",
        "Form validation",
        3000
      );
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Menu create form</h6>
            {/* <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              {lang.map((item, index) => {
                index++;
                return (
                  <li className="nav-item" role="presentation" key={index}>
                    <button
                      className={`nav-link ${index == 1 ? "active" : ""}  me-3`}
                      id={`pills-lang-${index}`}
                      data-bs-toggle="pill"
                      data-bs-target={`#pills-lang${index}`}
                      type="button"
                      role="tab"
                      aria-controls={`#pills-lang${index}`}
                      aria-selected="true"
                    >
                      {item.title}
                    </button>
                  </li>
                );
              })}
            </ul> */}
            <div className="tab-content" id="pills-tabContent">
              {/* {lang.map((item, index) => {
                index++;
                return (
                  <div
                    key={index}
                    className={`tab-pane fade ${
                      index == 1 ? "show active" : ""
                    }`}
                    id={`pills-lang${index}`}
                    role="tabpanel"
                    aria-labelledby={`pills-lang-${index}`}
                  > */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title : ru
                      </label>
                      <input
                        type="text"
                        name="title_ru"
                        onChange={handleChange}
                        value={data.title_ru || ""}
                        className="form-control"
                        id="title"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title2" className="form-label">
                        Title : uz
                      </label>
                      <input
                        type="text"
                        name="title_uz"
                        onChange={handleChange}
                        value={data.title_uz || ""}
                        className="form-control"
                        id="title2"
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <Switch setData={setData} value={data.status} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigation("/admin/courses-category");
                  }}
                  className="btn btn-warning me-3"
                >
                  Back
                </button>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
              {/* </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
