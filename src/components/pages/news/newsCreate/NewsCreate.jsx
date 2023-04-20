import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditorText from "../../../layouts/editorText/EditorText";
import slug from "slug";
import Switch from "../../../layouts/switch/Switch";
import Uploader from "../../../layouts/uploader/Uploader";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";

export default function NewsCreate() {
  const [categoryId, setCategoryId] = useState(0);
  const [data, setData] = useState({
    title_en: "",
    title_ru: "",
    title_uz: "",
    content_en: "",
    content_ru: "",
    content_uz: "",
    short_content_en: "",
    short_content_ru: "",
    short_content_uz: "",
    created_on: new Date(),
    alias: "",
    status: false,
  });
  const [lang, setLang] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}lang/get`).then((res) => {
      setLang(res.data.data.result);
    });

    data.created_on = Math.floor(data.created_on.getTime() / 1000);
    axios
      .post(`${process.env.REACT_APP_API_URL}news/create`, data)
      .then((res) => {
        if (res.status == 200) {
          setCategoryId(res.data.id);
        }
      });
    data.created_on = new Date();
  }, [0]);
  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const lang = event.target.lang;
    if (lang) {
      let nameIn = inputName + "_" + lang;
      if (inputName == "title") {
        const slugifyTest = slug(inputValue, { locale: "bg" });
        setData((oldValue) => ({ ...oldValue, ["alias"]: slugifyTest }));
      }
      // setData(oldValue=>({...oldValue, [inputName]: {...oldValue[inputName],  [lang]:inputValue}}))
      setData((oldValue) => ({ ...oldValue, [nameIn]: inputValue }));
    } else {
      setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.title_ru.length > 0) {
      data.created_on = Math.floor(data.created_on.getTime() / 1000);
      axios
        .put(`${process.env.REACT_APP_API_URL}news/update/${categoryId}`, data)
        .then((res) => {
          if (res.status == 200) {
            navigation("/admin/news", { replace: true });
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
            <h6 className="mb-4">News create form</h6>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
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
              <form onSubmit={handleSubmit}>
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
                        <div className="col-12">
                          <div className="mb-3">
                            <label
                              htmlFor="short_content"
                              className="form-label"
                            >
                              Short Content
                            </label>

                            <textarea
                              name="short_content"
                              lang={item.key}
                              value={data["short_content_" + item.key]}
                              onChange={handleChange}
                              className="form-control"
                              id="short_content"
                              rows={6}
                            />
                          </div>
                        </div>
                        <div className="col-12 ">
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
                      </div>
                    </div>
                  );
                })}
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="other_link" className="form-label">
                        Date
                      </label>
                      <DatePicker
                        className="form-control"
                        name="created_on"
                        dateFormat="dd.MM.yyyy HH:mm"
                        selected={data.created_on}
                        onChange={(e) => {
                          setData((old) => ({ ...old, ["created_on"]: e }));
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
                    {categoryId ? (
                      <Uploader category="news" category_id={categoryId} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigation("/admin/news");
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
