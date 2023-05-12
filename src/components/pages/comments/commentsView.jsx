import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Switch from "../../layouts/switch/Switch";
import Uploader from "../../layouts/uploader/Uploader";
import ImageUploadPreviewComponent from "../../imageUploader";
import { baseUrl } from "../../../shared/constants";
import { useJwtApi } from "../../../api/jwtApi";

import Spinner from "../../spinner";

import "./style.scss";

export default function CommentsView() {
  const { id } = useParams();
  const { jwtApi } = useJwtApi();

  const [data, setData] = useState({
    fullName: "",
    commentUz: "",
    commentRu: "",
    job: "",
    id: null,
  });

  const navigator = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);

  // function createFileFromBase64(base64String) {
  //   // console.log(base64String.slice(base64String.indexOf(",") + 1));
  //   const binaryString = window.atob(
  //     base64String.slice(base64String.indexOf(",") + 1)
  //   );
  //   const bytes = new Uint8Array(binaryString.length);
  //   for (let i = 0; i < binaryString.length; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   const file = new File([bytes.buffer], crypto.randomUUID(), {
  //     type: "image/jpeg",
  //   }); // change the type based on the file type
  //   return file;
  // }

  const getComment = async () => {
    console.log(baseUrl);
    setPageLoad(true);
    console.log("hello");
    const res = await axios.get(`${baseUrl}/comments/${id}`);

    const productData = res.data;
    console.log(productData);
    setData(productData);

    console.log(productData);
    setPageLoad(false);
  };

  useEffect(() => {
    getComment();
    setLoading(false);
  }, []);

  console.log(data);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const dataToSubmit = {
        fullName: data.fullName,
        commentUz: data.commentUz,
        commentRu: data.commentRu,
        job: data.job,
        id: data.id,
      };

      console.log(dataToSubmit);

      const res = await jwtApi.post("/comments", dataToSubmit);

      console.log(res);

      setLoading(false);
      setData({});
      NotificationManager.success("Comment edited", "Success");
      navigator("/comments", { replace: true });
    } catch (error) {
      setLoading(false);
      NotificationManager.error(error.message, "Form validation");
      console.log(error);
    }
  };

  return pageLoad ? (
    <Spinner />
  ) : (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Edit the comment</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Fullname
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={data.fullName}
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
                      Job
                    </label>
                    <input
                      type="text"
                      name="job"
                      value={data.job}
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
                      Comment : ru
                    </label>
                    <textarea
                      name="commentRu"
                      // lang={item.key}
                      value={data.commentRu}
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
                      Comment : uz
                    </label>
                    <textarea
                      name="commentUz"
                      // lang={item.key}
                      value={data.commentUz}
                      onChange={handleChange}
                      className="form-control"
                      id="short_content_ru"
                      rows={6}
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary"
              >
                {loading ? "Loading..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
