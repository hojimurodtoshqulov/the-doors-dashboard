import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

export default function UserCreate() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "",
    status: "false",
  });
  const navigation = useNavigate();

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}user/create`, data)
      .then((res) => {
        if (res.status == 200) {
          navigation("/admin/users", { replace: true });
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
            <h6 className="mb-4">User create form</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputPassword1"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select   mb-3"
                    name="role"
                    onChange={handleChange}
                    aria-label=".form-select-sm example"
                    required
                  >
                    <option value="">Please select</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select   mb-3"
                    name="status"
                    onChange={handleChange}
                    aria-label=".form-select-sm example"
                  >
                    <option value="false">Inactive</option>
                    <option value="true">Active</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigation("/admin/users");
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
