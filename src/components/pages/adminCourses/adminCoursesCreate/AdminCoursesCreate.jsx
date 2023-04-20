import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slug from "slug";
import Switch from "../../../layouts/switch/Switch";
import Uploader from "../../../layouts/uploader/Uploader";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";

export default function AdminCoursesCreate() {
  const [categoryId, setCategoryId] = useState(0);
  const [data, setData] = useState({
    titleRu: "",
    titleUz: "",
    descriptionUz: "",
    descriptionRu: "",
    price: 0,
    discount: 0,
    attachmentContentsId: "",
  });
  const [lang, setLang] = useState([]);
  const [coursesCategory, setCoursesCategory] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    // axios.get(`${process.env.REACT_APP_API_URL}lang/get`).then((res) => {
    //   setLang(res.data.data.result);
    // });
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}courses_category/get-main`)
    //   .then((res) => {
    //     setCoursesCategory(res.data.data.result);
    //   });
    // data.created_on = Math.floor(data.created_on.getTime() / 1000);
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}courses/create`, data)
    //   .then((res) => {
    //     if (res.status == 200) {
    //       setCategoryId(res.data.id);
    //     }
    //   });
    // data.created_on = new Date();
  }, [0]);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const lang = event.target.lang;

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

    console.log(data);
    // if (data.title_ru.length > 0) {
    //   axios
    //     .put(
    //       `${process.env.REACT_APP_API_URL}courses/update/${categoryId}`,
    //       data
    //     )
    //     .then((res) => {
    //       if (res.status == 200) {
    //         navigation("/admin/courses", { replace: true });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   NotificationManager.warning(
    //     "Please fill in the fields",
    //     "Form validation",
    //     3000
    //   );
    // }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Courses create form</h6>
            <div className="tab-content" id="pills-tabContent">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title_ru" className="form-label">
                        Title : ru
                      </label>
                      <input
                        type="text"
                        name="titleRu"
                        // lang={item.key}
                        value={data.titleRu}
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
                        name="titleUz"
                        // lang={item.key}
                        value={data.titleUz}
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
                        name="descriptionRu"
                        // lang={item.key}
                        value={data.descriptionRu}
                        onChange={handleChange}
                        className="form-control"
                        id="short_content_ru"
                        rows={6}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="short_content_uz" className="form-label">
                        Short Content : uz
                      </label>

                      <textarea
                        name="descriptionUz"
                        // lang={item.key}
                        value={data.descriptionUz}
                        onChange={handleChange}
                        className="form-control"
                        id="short_content_uz"
                        rows={6}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        onChange={handleChange}
                        value={data.price}
                        className="form-control"
                        id="price"
                        required
                      />
                    </div>
                  </div>
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
