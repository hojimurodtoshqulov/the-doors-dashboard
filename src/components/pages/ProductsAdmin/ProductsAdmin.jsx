import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../shared/constants";
import { useTranslation } from "react-i18next";

import Spinner from "../../spinner";
import { useJwtApi } from "../../../api/jwtApi";

function TeachersAdmin({ usersState, updateUsers }) {
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [pageLoad, setPageLoad] = useState(false);
  const { jwtApi } = useJwtApi();

  const { i18n } = useTranslation();

  const handleDelete = (id) => {
    jwtApi
      .delete(`/products/${id}`, { "Content-Type": "application/json" })
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
          // navigation("/admin/users", { replace: true } )
        }
      });
  };

  const title = i18n.language === "ru" ? "titleRu" : "titleUz";

  useEffect(() => {
    setPageLoad(true);
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        console.log(res);

        setData(res.data);
      })
      .finally(() => {
        setPageLoad(false);
      });
  }, [count]);

  return pageLoad ? (
    <Spinner />
  ) : (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">Products </h6>
              <NavLink to="create" className="btn btn-dark rounded-pill ">
                Create
              </NavLink>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ?.filter((item) => item?.name_ru !== "")
                    .map(function (item, index) {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item[title]}</td>
                          <td>
                            <NavLink
                              to={`view/${item?.id}`}
                              className="btn btn-info rounded-pill "
                            >
                              View
                            </NavLink>
                          </td>
                          <td>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-danger rounded-pill "
                              onClick={() => handleDelete(item?.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeachersAdmin;
