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
    link: "",
    attachmentContentId: null,
    id: null,
  });

  const [upload, setUpload] = useState({
    pictures: [],
    maxFileSize: 5242880,
    imgExtension: [".jpg", ".png"],
    defaultImages: [],
    editStarted: false,
  });

  const navigator = useNavigate();

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

  const getPartner = async () => {
    console.log(baseUrl);
    setPageLoad(true);
    console.log("hello");
    const res = await axios.get(`${baseUrl}/partners/${id}`);

    const productData = res.data;
    console.log(productData);
    setData(productData);

    let images = [
      `https://the-doors.herokuapp.com/api/files/${productData.attachmentContentId}`,
    ];

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
    getPartner();
    setLoading(false);
  }, []);

  console.log(data);
  const sumbitImages = async () => {
    if (!upload.editStarted) {
      return data.attachmentContentId;
    }
    try {
      const formData = new FormData();

      const { pictures, defaultImages } = upload;

      const allPics = [...pictures];
      console.log(allPics);

      if (allPics.length !== 1) throw new Error("Upload 1 image");
      allPics.forEach((file) => {
        formData.append("file", file);
      });

      const res = await axios.post(`${baseUrl}/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      return res.data[0];
    } catch (error) {
      throw error;
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
      const attachmentContentId = await sumbitImages();
      console.log(attachmentContentId);
      const dataToSubmit = {
        link: data.link,
        attachmentContentId,
        id: +id,
      };

      console.log(dataToSubmit);

      const res = await jwtApi.post("/partners", dataToSubmit);

      console.log(res);

      setLoading(false);
      setUpload({
        pictures: [],
        maxFileSize: 5242880,
        imgExtension: [".jpg", ".png"],
        defaultImages: [],
        editStarted: false,
      });
      setData({});
      NotificationManager.success("Partner edited", "Success");
      navigator("/partners", { replace: true });
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
            <h6 className="mb-4">Edit the partner</h6>
            <form
              className={`${!upload.editStarted && "hideCloseBtns"}`}
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="w-100">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      value={data.link}
                      onChange={handleChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      required
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
