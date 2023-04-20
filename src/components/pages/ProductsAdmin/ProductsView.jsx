import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Uploader from "../../layouts/uploader/Uploader";
import Switch from "../../layouts/switch/Switch";

export default function TeacherView() {
  const [data, setData] = useState({
    name_ru: "",
    name_uz: "",
    short_content_ru: "",
    short_content_uz: "",
    status: true,
  });

  const [password, setPassword] = useState(".");
  const params = useParams();
  const id = params.id;
  const navigation = useNavigate();

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  // const handleChangePassword = (event) => {
  //   const inputValue = event.target.value;

  //   setPassword(inputValue);
  // };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}teachers/get/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setData(res.data.data);
        }
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password != "" && password != ".") {
      data["password"] = password;
    } else {
      delete data["password"];
    }
    axios
      .put(`${process.env.REACT_APP_API_URL}teachers/update/${id}`, data)
      .then((res) => {
        if (res.status == 200) {
          navigation("/admin/teacher", { replace: true });
        }
      });
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Teacher update form</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail9" className="form-label">
                      Name : ru
                    </label>
                    <input
                      type="text"
                      name="name_ru"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail9"
                      value={data.name_ru || ""}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail65" className="form-label">
                      Name : uz
                    </label>
                    <input
                      type="text"
                      name="name_uz"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail65"
                      value={data.name_uz || ""}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail2" className="form-label">
                      Info : ru
                    </label>
                    <input
                      type="text"
                      name="short_content_ru"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail2"
                      value={data.short_content_ru || ""}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Info : uz
                    </label>
                    <input
                      type="text"
                      name="short_content_uz"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      value={data.short_content_uz || ""}
                      required
                    />
                  </div>
                </div>
                {/* <div className="col-6">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password || ""}
                      name="password"
                      onChange={handleChangePassword}
                      className="form-control"
                      id="exampleInputPassword1"
                      required
                    />
                  </div>
                </div> */}
                {/* <div className="col-6">
                  <select
                    className="form-select   mb-3"
                    name="role"
                    value={data.role || ""}
                    onChange={handleChange}
                    aria-label=".form-select-sm example"
                    required
                  >
                    <option value="">Please select</option>
                    <option value="admin">Admin</option>
                  </select>
                </div> */}
                {/* <div className="col-6">
                  <select
                    className="form-select   mb-3"
                    name="status"
                    value={data.status || "false"}
                    onChange={handleChange}
                    aria-label=".form-select-sm example"
                  >
                    <option value="false">Inactive</option>
                    <option value="true">Active</option>
                  </select>

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
                  {id ? <Uploader category="teachers" category_id={id} /> : ""}
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
