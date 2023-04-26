import { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import s from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../shared/constants";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Auth() {
  const htmlElement = document.querySelector("html");
  htmlElement.classList.remove("not-adminPages");
  const { setToken } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/", { replace: true });

    axios
      .post(`${baseUrl}/auth`, data)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.message;
          const tokenData = jwt(token);
          if (tokenData.sub === "admin") {
            sessionStorage.setItem("token", token);
            setToken(token);

            navigate("/", { replace: true });
          } else {
            alert("Admin user not found");
          }
        }
      })
      .catch((err) => {
        alert("User not found");
      });
  };
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      const tokenData = jwt(sessionToken);
      if (tokenData.role == "admin") {
        navigate("/admin", { replace: true });
      }
    }
  }, []);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };
  return (
    <div className="scontainer-fluid overflow-hidden">
      <div
        className="row vh-100 hidden align-items-center justify-content-center"
      >
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <a href="index.html" className="">
                <h3 className="text-primary">
                  <i className="fa fa-user-edit me-2"></i>DarkPan
                </h3>
              </a>
              <h3>Sign In</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Username"
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                Sign In
              </button>
            </form>

            {/* <p className="text-center mb-0">Don't have an Account? <a href="">Sign Up</a></p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
