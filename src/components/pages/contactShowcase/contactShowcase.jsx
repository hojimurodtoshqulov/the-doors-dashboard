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
import ReactQuill from "react-quill";

export default function ContactShowcase() {
  const { id } = useParams();
  const { jwtApi } = useJwtApi();

  const [data, setData] = useState({
    titleRu: "",
    titleUz: "",
    telNum1: "",
    telNum2: "",
    telNum3: "",
    descriptionRu: "",
    descriptionUz: "",
    attachmentContentsId: [],
  });

  const [upload, setUpload] = useState({
    pictures: [],
    maxFileSize: 5242880,
    imgExtension: [".jpg", ".png"],
    defaultImages: [],
    editStarted: false,
  });

  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);

  const handleImageChange = (files, base64) => {
    console.log(base64);
    if (!upload.editStarted) {
      setUpload((prev) => {
        return {
          ...prev,
          defaultImages: [...base64.slice(1)],
          editStarted: true,
        };
      });
    }
    setUpload(
      (prevUpload) => {
        return { ...prevUpload, pictures: [...files] };
      },
      () => {
        console.warn(files);
      }
    );
  };

  const getProduct = async () => {
    console.log(baseUrl);
    setPageLoad(true);
    console.log("hello");
    const res = await axios.get(`${baseUrl}/show-case/3`);

    const productData = res.data;
    const telNumbers = productData.titleUz.split("*");
    setData({
      ...productData,
      telNum1: telNumbers[0],
      telNum2: telNumbers[1],
      telNum3: telNumbers[2],
    });
    const imageIDs = productData.attachmentContentIds;

    let images = [];

    imageIDs.map((item) => {
      const img = `https://the-doors.herokuapp.com/api/files/${item}`;
      images.push(img);
    });

    setUpload(
      (prevUpload) => ({
        ...prevUpload,
        defaultImages: images,
      }),
      () => {
        console.warn("It was added!");
      }
    );

    console.log(productData);
    setPageLoad(false);
  };

  useEffect(() => {
    getProduct();
    setLoading(false);
  }, []);

  const sumbitImages = async () => {
    if (!upload.editStarted) return data.attachmentContentIds;
    try {
      const formData = new FormData();

      const { pictures, defaultImages } = upload;

      const allPics = [...pictures];
      console.log(pictures);

      if (allPics.length !== 1) throw new Error("Upload 1 images");

      allPics.forEach((file) => {
        formData.append("file", file);
      });

      const res = await axios.post(`${baseUrl}/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      NotificationManager.error(error.message, "Image error");
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const attachmentContentIds = await sumbitImages();
      const telNumbers = `${data.telNum1}*${data.telNum2}*${data.telNum3}`;
      const dataToSubmit = {
        id: 3,
        titleUz: telNumbers,
        titleRu: telNumbers,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        attachmentContentIds,
      };

      console.log(dataToSubmit);

      const res = await jwtApi.post("/show-case", dataToSubmit);

      console.log(res);

      setLoading(false);
      setUpload({
        pictures: [],
        maxFileSize: 5242880,
        imgExtension: [".jpg", ".png"],
        defaultImages: [],
        editStarted: false,
      });
      NotificationManager.success("Showcase edited", "Success");
      getProduct();
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
            <h6 className="mb-4">Edit Cantact showcase information</h6>
            <form
              className={`${
                !upload.editStarted && "hideCloseBtns-works-showcase"
              }`}
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Phone number 1
                    </label>
                    <input
                      type="number"
                      name="telNum1"
                      value={data.telNum1}
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Phone number 2
                    </label>
                    <input
                      type="number"
                      name="telNum2"
                      value={data.telNum2}
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Phone number 3
                    </label>
                    <input
                      type="number"
                      name="telNum3"
                      value={data.telNum3}
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
                <div className="col-12 pb-3 mb-3 border-bottom">
                  <div class="mb-3">
                    <ImageUploadPreviewComponent
                      btnType="edit"
                      {...upload}
                      handleChange={handleImageChange}
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
