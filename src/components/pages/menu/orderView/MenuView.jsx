import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditorText from "../../../layouts/editorText/EditorText";
import slug from "slug";
import Switch from "../../../layouts/switch/Switch";
import axios from "axios";
import Uploader from "../../../layouts/uploader/Uploader";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";
import { baseUrl } from "../../../../shared/constants";

export default function MenuView() {
  const [data, setData] = useState({});
  const params = useParams();
  const id = params.id;
  const navigation = useNavigate();
  const [lang, setLang] = useState([]);
  useEffect(() => {
    // axios.get(`${process.env.REACT_APP_API_URL}menu/get/${id}`).then((res) => {
    //   setData(res.data.data);
    // });

    axios.get(`${baseUrl}/order/${id}`).then((res) => {
      console.log(res);
      setLang(res.data);
    });
  }, []);

  // const handleChange = (event) => {
  //   const inputName = event.target.name;
  //   const inputValue = event.target.value;
  //   const lang = event.target.lang;
  //   if (lang) {
  //     let nameIn = inputName + "_" + lang;
  //     if (inputName == "title") {
  //       const slugifyTest = slug(inputValue, { locale: "bg" });
  //       setData((oldValue) => ({ ...oldValue, ["alias"]: slugifyTest }));
  //     }
  //     // setData(oldValue=>({...oldValue, [inputName]: {...oldValue[inputName],  [lang]:inputValue}}))
  //     setData((oldValue) => ({ ...oldValue, [nameIn]: inputValue }));
  //   } else {
  //     setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  //   }
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (data.title_ru.length > 0) {
  //     data.created_on = Math.floor(new Date(data.created_on).getTime() / 1000);

  //     axios
  //       .put(`${process.env.REACT_APP_API_URL}menu/update/${id}`, data)
  //       .then((res) => {
  //         if (res.status == 200) {
  //           navigation("/admin/menu", { replace: true });
  //         }
  //       });
  //   } else {
  //     NotificationManager.warning(
  //       "Please fill in the fields",
  //       "Form validation",
  //       3000
  //     );
  //   }
  // };

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
            </ul>
            <div className="tab-content" id="pills-tabContent">
              {lang.map((item, index) => {
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
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              lang={item.key}
                              onChange={handleChange}
                              value={data["title_" + item.key] || ""}
                              className="form-control"
                              id="title"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                              Content
                            </label>
                            <EditorText
                              setData={setData}
                              lang={item.key}
                              value={data["content_" + item.key]}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="options" className="form-label">
                              Options
                            </label>
                            <input
                              type="text"
                              name="options"
                              onChange={handleChange}
                              value={data.options || ""}
                              className="form-control"
                              id="options"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="other_link" className="form-label">
                              Other link
                            </label>
                            <input
                              type="text"
                              name="other_link"
                              onChange={handleChange}
                              value={data.other_link || ""}
                              className="form-control"
                              id="other_link"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="other_link" className="form-label">
                              Date
                            </label>
                            <DatePicker
                              className="form-control"
                              dateFormat="dd.MM.yyyy HH:mm"
                              selected={new Date(data.created_on)}
                              onChange={(e) => {
                                setData((old) => ({
                                  ...old,
                                  ["created_on"]: e,
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="alias" className="form-label">
                              Alias
                            </label>
                            <input
                              type="text"
                              name="alias"
                              onChange={handleChange}
                              value={data.alias || ""}
                              className="form-control"
                              id="alias"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <Switch setData={setData} value={data.status} />
                        </div>
                        <div className="col-12 pb-3 mb-3 border-bottom">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                          >
                            Upload
                          </button>
                          {id ? (
                            <Uploader category="menu" category_id={id} />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigation("/admin/menu");
                        }}
                        className="btn btn-warning me-3"
                      >
                        Back
                      </button>

                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </form>
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
