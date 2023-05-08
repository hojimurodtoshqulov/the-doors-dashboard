import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { baseUrl } from "../../../shared/constants";
import { useJwtApi } from "../../../api/jwtApi";

export default function News() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  const { jwtApi } = useJwtApi();

  const handleDelete = (id) => {
    jwtApi.delete(`/partners/${id}`).then((res) => {
      if (res.status == 200) {
        setCount(count + 1);
      }
    });
  };

  const getPartners = async () => {
    try {
      const partners = await axios.get(`${baseUrl}/partners`);
      console.log(partners);
      setData(partners.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPartners();
  }, [count]);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">News </h6>
              <NavLink to="create" className="btn btn-dark rounded-pill ">
                Create
              </NavLink>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Links</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {data ? (
                    data.map(function (item, index) {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.link}</td>
                          <td>
                            <NavLink
                              to={`view/${item.id}`}
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
