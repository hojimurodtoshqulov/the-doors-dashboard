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
    attachmentContentIds: [1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217],
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
  const [toggle, setToggle] = useState(false);

  const handleImageChange = (files, base64) => {
    console.log(files);
    if (!upload.editStarted) {
      setUpload((prev) => {
        return {
          ...prev,
          defaultImages: [...base64.slice(8)],
          editStarted: true,
          pictures: [],
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

  const getImages = async () => {
    console.log(baseUrl);
    setPageLoad(true);
    console.log("hello");

    const imageIDs = data.attachmentContentIds;

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

    setPageLoad(false);
  };

  useEffect(() => {
    getImages();
    setLoading(false);
  }, []);

  const sumbitImages = async () => {
    if (!upload.editStarted) return data.attachmentContentIds;
    try {
      const { pictures, defaultImages } = upload;

      const allPics = [...pictures];

      if (allPics.length !== 8) throw new Error("Upload 8 images");

      const promises = data.attachmentContentIds.map((imgId, index) => {
        const formData = new FormData();
        formData.append("file", allPics[index]);
        return axios.post(`${baseUrl}/files/${imgId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
      });

      //   const res = await ;

      return await Promise.all(promises);
    } catch (error) {
      throw new Error("Upload 8 images");
    }
  };

  console.log(upload);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(upload);

    try {
      setLoading(true);
      await sumbitImages();

      setLoading(false);
      setUpload({
        pictures: [],
        maxFileSize: 5242880,
        imgExtension: [".jpg", ".png"],
        defaultImages: [],
        editStarted: false,
      });
      setToggle((prev) => !prev);
      NotificationManager.success("Showcase edited", "Success");
      getImages();
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
            <h6 className="mb-4">Project's images</h6>
            <form
              className={`${!upload.editStarted && "hideCloseBtns"}`}
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-12 pb-3 mb-3 border-bottom">
                  <div class="mb-3">
                    <ImageUploadPreviewComponent
                      key={toggle}
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
