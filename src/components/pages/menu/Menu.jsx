import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../../../shared/constants";
import { useJwtApi } from "../../../api/jwtApi";

import Spinner from "../../spinner";

import moment from "moment";

export default function Menu() {
  const { t, i18n } = useTranslation();

  const { jwtApi } = useJwtApi();

  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState({ page: false, api: false });
  const handleDelete = async (id) => {
    setLoading((prev) => ({ ...prev, api: true }));
    jwtApi
      .delete(`${baseUrl}/order/${id}`, { "Content-Type": "text/plain" })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setCount(count + 1);
        }
        setLoading((prev) => ({ ...prev, api: false }));
        return getOrders();
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, api: false }));
      });
  };
  useEffect(() => {
    setLoading((prev) => ({ ...prev, page: true }));
    getOrders().finally(() => setLoading((prev) => ({ ...prev, page: false })));
  }, []);

  const getOrders = async () => {
    try {
      return await axios.get(`${baseUrl}/order`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadingState = {
    opacity: loading.api ? 0.5 : 1,
    pointerEvents: loading.api ? "none" : "unset",
  };

  console.log(loadingState);

  console.log(data);

  return loading.page ? (
    <Spinner />
  ) : (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">Orders ({data.length}) </h6>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {data ? (
                    data.map(function (item, index) {
                      return (
                        <tr style={loadingState} key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.name}</td>
                          <td>
                            {moment(item.orderedTime).format(
                              "HH:mm | DD.MM.YYYY"
                            )}
                          </td>
                          <td>
                            <NavLink
                              to={`${item?.id}`}
                              className="btn btn-info rounded-pill "
                            >
                              View
                            </NavLink>
                          </td>
                          <td>
                            <button
                              disabled={loading.api}
                              type="button"
                              className="btn btn-danger rounded-pill "
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>Not found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
