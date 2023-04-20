import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function CoursesCategory() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}courses_category/delete/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}courses_category/get`)
      .then((res) => {
        setData(res.data.data.result);
      });
  }, [count]);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="d-flex justify-content-between">
              <h6 className="mb-4">Courses Category </h6>
              <NavLink to="create" className="btn btn-dark rounded-pill ">
                Create
              </NavLink>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {data ? (
                    data.map(function (item, index) {
                      return (
                        <tr key={index}>
                          <th scope="row">{item.id}</th>
                          <td>{item.title_ru}</td>
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
