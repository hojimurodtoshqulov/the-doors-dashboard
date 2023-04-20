import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slug from "slug";
import Switch from "../../../layouts/switch/Switch";
import { NotificationManager } from "react-notifications";

export default function CoursesCategoryCreate() {
  const [data, setData] = useState({
    title_ru: "",
    title_Uz: "",
    status: false,
  });
  const [lang, setLang] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}lang/get`).then((res) => {
      setLang(res.data.data.result);
    });
  }, [0]);
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
        .post(`${process.env.REACT_APP_API_URL}courses_category/create`, data)
        .then((res) => {
          if (res.status == 200) {
            navigation("/admin/courses-category", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
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
            <h6 className="mb-4">Courses Category create form</h6>
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
              <form onSubmit={handleSubmit}>
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
                    >
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              Title
                            </label>
                            {item.key == "ru" ? (
                              <input
                                type="text"
                                name="title"
                                lang={item.key}
                                value={data["title_" + item.key]}
                                onChange={handleChange}
                                className="form-control"
                                id="title"
                                requried
                              />
                            ) : (
                              <input
                                type="text"
                                name="title"
                                lang={item.key}
                                value={data["title_" + item.key]}
                                onChange={handleChange}
                                className="form-control"
                                id="title"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })} */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title : ru
                      </label>

                      <input
                        type="text"
                        name="title_ru"
                        // lang={item.key}
                        value={data.title_ru}
                        onChange={handleChange}
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
                        name="title_Uz"
                        // lang={item.key}
                        value={data.title_Uz}
                        onChange={handleChange}
                        className="form-control"
                        id="title2"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
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
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
