import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Switch from "../../layouts/switch/Switch";
import Uploader from "../../layouts/uploader/Uploader";
import ImageUploadPreviewComponent from "../../imageUploader";

export default function ProductsCreate() {
  const [categoryId, setCategoryId] = useState(0);
  const [lang, setLang] = useState([]);
  const [data, setData] = useState({
    name_ru: "",
    name_uz: "",
    short_content_ru: "",
    short_content_uz: "",
    status: false,
  });

  const navigation = useNavigate();

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  useEffect(() => {
    // axios.get(`${process.env.REACT_APP_API_URL}lang/get`).then((res) => {
    //   setLang(res.data.data.result);
    // });

    // axios
    //   .get(`${process.env.REACT_APP_API_URL}courses_category/get-main`)
    //   .then((res) => {
    //     setCoursesCategory(res.data.data.result);
    //   });

    // data.created_on = Math.floor(data.crea ted_on.getTime() / 1000);
    axios
      .post(`${process.env.REACT_APP_API_URL}teachers/create`, data)
      .then((res) => {
        if (res.status === 200) {
          setCategoryId(res.data.id);
        }
      });
    // data.created_on = new Date();
  }, [0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}teachers/update/${categoryId}`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          // setCategoryId(res.data.id);
          navigation("/admin/teacher", { replace: true });
        }
      })
      .catch((err) => {
        NotificationManager.error("Error create user", "Error!");
      });
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Create a product</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Name : ru
                    </label>
                    <input
                      type="text"
                      name="name_ru"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Name : uz
                    </label>
                    <input
                      type="text"
                      name="name_uz"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Description : ru
                    </label>
                    <textarea
                      name="short_content_ru"
                      // lang={item.key}
                      // value={data["short_content_" + item.key]}
                      onChange={handleChange}
                      className="form-control"
                      id="short_content_ru"
                      rows={6}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Description : uz
                    </label>
                    <textarea
                      name="short_content_ru"
                      // lang={item.key}
                      // value={data["short_content_" + item.key]}
                      onChange={handleChange}
                      className="form-control"
                      id="short_content_ru"
                      rows={6}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      name="name_ru"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="form-group">
                      <label htmlFor="images">Select Images:</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="images"
                        name="images"
                        multiple
                        // onChange={handleFileSelect}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 pb-3 mb-3 border-bottom">
                  <div class="mb-3">
                    <ImageUploadPreviewComponent />
                  </div>
                  {/* <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                    Upload
                  </button>
                  {categoryId ? (
                    <Uploader category="teachers" category_id={categoryId} />
                  ) : (
                    ""
                  )} */}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigation("/admin/teacher");
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
  );
}
