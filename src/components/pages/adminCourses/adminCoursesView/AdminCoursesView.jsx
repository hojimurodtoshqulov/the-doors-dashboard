import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import slug from "slug";
import Switch from "../../../layouts/switch/Switch";
import axios from "axios";
import Uploader from "../../../layouts/uploader/Uploader";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";

export default function AdminCoursesView() {
  const [data, setData] = useState({
    title_ru: "",
    title_uz: "",
    price: 0,
    category_id: 0,
    short_content_ru: "",
    short_content_uz: "",
    created_on: new Date(),
    alias: "",
    status: false,
  });
  const params = useParams();
  const id = params.id;
  const navigation = useNavigate();
  const [lang, setLang] = useState([]);
  const [coursesCategory, setCoursesCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}courses/get/${id}`)
      .then((res) => {
        setData(res.data.data);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}courses_category/get-main`)
      .then((res) => {
        setCoursesCategory(res.data.data.result);
      });

    axios.get(`${process.env.REACT_APP_API_URL}lang/get`).then((res) => {
      setLang(res.data.data.result);
    });
  }, []);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    // const lang = event.target.lang;
    if (inputName === "title_uz") {
      const slugifyTest = slug(inputValue, { locale: "bg" });
      setData((oldValue) => ({ ...oldValue, ["alias"]: slugifyTest }));
    }
    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
    // if (lang) {
    //   let nameIn = inputName + "_" + lang;
    //   // setData(oldValue=>({...oldValue, [inputName]: {...oldValue[inputName],  [lang]:inputValue}}))
    //   setData((oldValue) => ({ ...oldValue, [nameIn]: inputValue }));
    // } else {
    // }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.title_ru.length > 0) {
      data.created_on = Math.floor(new Date(data.created_on).getTime() / 1000);
      data.price = parseInt(data.price);
      data.category_id = parseInt(data.category_id);
      axios
        .put(`${process.env.REACT_APP_API_URL}courses/update/${id}`, data)
        .then((res) => {
          if (res.status == 200) {
            navigation("/admin/courses", { replace: true });
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
                return ( */}
              {/* <div
                key={index}
                className={`tab-pane fade ${index == 1 ? "show active" : ""}`}
                id={`pills-lang${index}`}
                role="tabpanel"
                aria-labelledby={`pills-lang-${index}`}
              > */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title_ru" className="form-label">
                        Title : ru
                      </label>
                      <input
                        type="text"
                        name="title_ru"
                        value={data.title_ru || ""}
                        // lang={item.key}
                        // value={data["title_" + item.key]}
                        onChange={handleChange}
                        className="form-control"
                        id="title_ru"
                        requried
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title_uz" className="form-label">
                        Title : uz
                      </label>
                      <input
                        type="text"
                        name="title_uz"
                        value={data.title_uz || ""}
                        // lang={item.key}
                        // value={data["title_" + item.key]}
                        onChange={handleChange}
                        className="form-control"
                        id="title_uz"
                        requried
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="short_content_ru" className="form-label">
                        Short Content : ru
                      </label>

                      <textarea
                        name="short_content_ru"
                        // lang={item.key}
                        // value={data["short_content_" + item.key]}
                        onChange={handleChange}
                        value={data.short_content_ru || ""}
                        className="form-control"
                        id="short_content_ru"
                        rows={6}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="short_content_uz" className="form-label">
                        Short Content : uz
                      </label>

                      <textarea
                        name="short_content_uz"
                        // lang={item.key}
                        // value={data["short_content_" + item.key]}
                        value={data.short_content_uz || ""}
                        onChange={handleChange}
                        className="form-control"
                        id="short_content_uz"
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      onChange={handleChange}
                      value={data.price || ""}
                      className="form-control"
                      id="price"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="category_id" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select   mb-3"
                    name="category_id"
                    id="category_id"
                    onChange={handleChange}
                    aria-label=".form-select-sm example"
                  >
                    <option value="0">Please select</option>
                    {coursesCategory
                      ? coursesCategory.map((item1, index) => {
                          return (
                            <option
                              key={index}
                              value={item1.id}
                              selected={item1.id == data.category_id}
                            >
                              {item1.title_ru}
                            </option>
                          );
                        })
                      : ""}
                  </select>
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
                  {id ? <Uploader category="courses" category_id={id} /> : ""}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigation("/admin/courses");
                  }}
                  className="btn btn-warning me-3"
                >
                  Back
                </button>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
              {/* </div> */}
              {/* ); })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
