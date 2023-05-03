import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Switch from "../../layouts/switch/Switch";
import Uploader from "../../layouts/uploader/Uploader";
import ImageUploadPreviewComponent from "../../imageUploader";
import { baseUrl } from "../../../shared/constants";
import { useJwtApi } from "../../../api/jwtApi";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quilStyle.scss";

export default function ProductsCreate() {
  const [data, setData] = useState({
    titleRu: "",
    titleUz: "",
    descriptionRu: "",
    descriptionUz: "",
    price: 0,
    discount: 0,
    attachmentContentsId: [],
  });

  const { jwtApi } = useJwtApi();

  const [upload, setUpload] = useState({
    pictures: [],
    maxFileSize: 5242880,
    imgExtension: [".jpg", ".png"],
    defaultImages: [],
  });

  const [loading, setLoading] = useState(false);
  // const [pageLoad, setPageLoad] = useState(false);

  const handleImageChange = (files) => {
    console.log(files);
    setUpload(
      (prevUpload) => ({
        ...prevUpload,
        pictures: [files],
      }),
      () => {
        console.warn("It was added!");
      }
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const sumbitImages = async () => {
    try {
      const formData = new FormData();

      const { pictures, defaultImages } = upload;

      if (pictures[0].length !== 4) throw new Error("Upload 4 images");

      pictures[0].forEach((base64) => {
        formData.append(
          "file",
          new File([base64], `image${crypto.randomUUID()}`, {
            type: "image/jpeg",
          })
        );
      });

      const res = await axios.post(`${baseUrl}/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      NotificationManager.error(error.message, "Images error");
      console.log(error);
    }
  };

  const navigation = useNavigate();

  const handleChange = (event, key) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (data.discount > 100)
        throw new Error("Discount cannot be more then 100");

      const attachmentContentsId = await sumbitImages();
      const dataToSubmit = {
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        price: parseInt(data.price),
        discount: parseInt(data.discount),
        attachmentContentsId,
      };

      console.log(dataToSubmit);

      const res = await jwtApi.post("/products", dataToSubmit);

      console.log(res);
      setLoading(false);
      navigation("/product");
      NotificationManager.success("Porduct created", "Success");
    } catch (error) {
      setLoading(false);
      NotificationManager.error(error.message, "Form validation");
      console.log(error);
    }
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
                      Title : ru
                    </label>
                    <input
                      type="text"
                      name="titleRu"
                      value={data.titleRu}
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
                      Title : uz
                    </label>
                    <input
                      type="text"
                      name="titleUz"
                      value={data.titleUz}
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
                    {/*  <textarea
                      name="descriptionRu"
                      // lang={item.key}
                      value={data.descriptionRu}
                      onChange={handleChange}
                      className="form-control"
                      id="short_content_ru"
                      rows={6}
                    /> */}
                    <ReactQuill
                      theme={"snow"}
                      value={data.descriptionRu}
                      onChange={(val) => {
                        const event = {
                          target: { value: val, name: "descriptionRu" },
                        };
                        handleChange(event);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Description : uz
                    </label>
                    {/*  <textarea
                      name="descriptionUz"
                      // lang={item.key}
                      value={data.descriptionUz}
                      
                      className="form-control"
                      id="short_content_ru"
                      rows={6}
                    /> */}
                    <ReactQuill
                      theme={"snow"}
                      value={data.descriptionUz}
                      onChange={(val) => {
                        const event = {
                          target: { value: val, name: "descriptionUz" },
                        };
                        handleChange(event);
                      }}
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
                      name="price"
                      value={data.price}
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
                      Discount
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={data.discount}
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                    />
                  </div>
                </div>

                <div className="col-12 pb-3 mb-3 border-bottom">
                  <div class="mb-3">
                    <ImageUploadPreviewComponent
                      {...upload}
                      handleChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                type="button"
                onClick={() => {
                  navigation("/admin/teacher");
                }}
                className="btn btn-warning me-3"
              >
                Back
              </button>

              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary"
              >
                {loading ? "Loading..." : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
