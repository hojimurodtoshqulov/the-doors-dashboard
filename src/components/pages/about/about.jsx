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

export default function ProductsEdit() {
  const { id } = useParams();
  const { jwtApi } = useJwtApi();

  const [data, setData] = useState({
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
          defaultImages: [...base64.slice(2)],
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

  const getProduct = async () => {
    console.log(baseUrl);
    setPageLoad(true);
    console.log("hello");
    const res = await axios.get(`${baseUrl}/about-us`);

    const productData = res.data;
    setData(productData);
    const imageIDs = productData.attachmentContentIds;

    let images = [];

    imageIDs.map((image) => {
      const img = `https://the-doors.herokuapp.com/api/files/${image}`;
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

      if (allPics.length !== 2) throw new Error("Upload 2 images");

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
      const dataToSubmit = {
        id: 1,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        attachmentContentIds,
      };

      console.log(data);

      const res = await jwtApi.post("/about-us", dataToSubmit);

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
            <h6 className="mb-4">Edit about information</h6>
            <form
              className={`${!upload.editStarted && "hideCloseBtns"}`}
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Description : ru
                    </label>
                    <textarea
                      name="descriptionRu"
                      // lang={item.key}
                      value={data.descriptionRu}
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
                      Description : uz
                    </label>
                    <textarea
                      name="descriptionUz"
                      // lang={item.key}
                      value={data.descriptionUz}
                      onChange={handleChange}
                      className="form-control"
                      id="short_content_ru"
                      rows={6}
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
