import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditorText from "../../../layouts/editorText/EditorText";
import slug from "slug";
import Switch from "../../../layouts/switch/Switch";
import Uploader from "../../../layouts/uploader/Uploader";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";

export default function MenuCreate() {
  const [categoryId, setCategoryId] = useState(0);
  const [data, setData] = useState({
    title_en: "",
    title_ru: "",
    title_uz: "",
    content_en: "",
    content_ru: "",
    content_uz: "",
    created_on: new Date(),
    category_id: 0,
    options: "",
    other_link: "",
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
      .post(`${process.env.REACT_APP_API_URL}menu/create`, data)
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
    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
    // if (lang) {
    //   let nameIn = inputName + "_" + lang;
    //   if (inputName == "title") {
    //     const slugifyTest = slug(inputValue, { locale: "bg" });
    //     setData((oldValue) => ({ ...oldValue, ["alias"]: slugifyTest }));
    //   }
    //   // setData(oldValue=>({...oldValue, [inputName]: {...oldValue[inputName],  [lang]:inputValue}}))
    //   setData((oldValue) => ({ ...oldValue, [nameIn]: inputValue }));
    // } else {
    // }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (data.title_ru.length > 0) {
      data.created_on = Math.floor(data.created_on.getTime() / 1000);

      axios
        .put(`${process.env.REACT_APP_API_URL}menu/update/${categoryId}`, data)
        .then((res) => {
          if (res.status == 200) {
            navigation("/admin/menu", { replace: true });
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
            <h6 className="mb-4">Menu create form</h6>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              {/* {lang.map((item, index) => {
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
              })} */}
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <form onSubmit={handleSubmit}>
                {/* {lang.map((item, index) => {
                  index++;
                  return ( */}
                {/* <div
                      key={index}
                      className={`tab-pane fade ${
                        index == 1 ? "show active" : ""
                      }`}
                      id={`pills-lang${index}`}
                      role="tabpanel"
                      aria-labelledby={`pills-lang-${index}`}
                    > */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title_ru" className="form-label">
                        Title : ru
                      </label>
                      <input
                        type="text"
                        name="title_ru"
                        // lang={item.key}

                        onChange={handleChange}
                        className="form-control"
                        id="title_ru"
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
                        // lang={item.key}

                        onChange={handleChange}
                        className="form-control"
                        id="title_uz"
                      />
                    </div>
                  </div>
                  {/* <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">
                        Content
                      </label>
                      <EditorText
                        setData={setData}
                        // lang={item.key}
                        value={data["content_" + item.key]}
                      />
                    </div>
                  </div> */}
                </div>
                {/* </div> */}
                {/* //   );
                // })} */}
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="options" className="form-label">
                        Options
                      </label>
                      <input
                        type="text"
                        name="options"
                        onChange={handleChange}
                        className="form-control"
                        id="options"
                      />
                    </div>
                  </div>
                  {/* <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="other_link" className="form-label">
                        Other link
                      </label>
                      <input
                        type="text"
                        name="other_link"
                        onChange={handleChange}
                        className="form-control"
                        id="other_link"
                      />
                    </div>
                  </div> */}
                  {/* <div className="col-12">
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
                  </div> */}
                  {/* <div className="col-12">
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
                  </div> */}
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
                      <Uploader category="menu" category_id={categoryId} />
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
