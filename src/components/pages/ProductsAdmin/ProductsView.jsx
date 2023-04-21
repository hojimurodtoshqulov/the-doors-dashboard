import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Switch from "../../layouts/switch/Switch";
import Uploader from "../../layouts/uploader/Uploader";
import ImageUploadPreviewComponent from "../../imageUploader";
import { baseUrl } from "../../../shared/constants";
import { jwtApi } from "../../../api/jwtApi";

import Spinner from "../../spinner";

import "./style.scss";

export default function ProductsEdit() {
  const { id } = useParams();

  const [data, setData] = useState({
    id: 0,
    titleRu: "",
    titleUz: "",
    descriptionRu: "",
    descriptionUz: "",
    price: 0,
    discount: 0,
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
    if (!upload.editStarted) {
      setUpload((prev) => {
        return { ...prev, defaultImages: [base64[4]], editStarted: true };
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
    setPageLoad(true);
    console.log("hello");
    const res = await axios.get(`${baseUrl}/products/${id}`);

    const productData = res.data;
    setData(productData);
    const base64Images = productData.attachmentContents;

    let images = [];

    base64Images.map(({ data }) => {
      const img = `data:image/jpg;base64,${data}`;
      images.push(img);
    });

    console.log();

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
    if (!upload.editStarted)
      return data.attachmentContents.map((item) => item.id);
    try {
      const formData = new FormData();

      const { pictures, defaultImages } = upload;

      const allPics = [...pictures];

      if (allPics.length !== 4) throw new Error("Upload 4 images");

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

  const navigation = useNavigate();

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const attachmentContentsId = await sumbitImages();

      const dataToSubmit = {
        id: data.id,
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        price: data.price,
        discount: data.discount,
        attachmentContentsId,
      };

      console.log(data);

      const res = await jwtApi.post("/products", dataToSubmit);

      console.log(res);

      NotificationManager.success("Product updated", "Success");
      setLoading(false);
      navigation("/product");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    sumbitImages();
  };

  return pageLoad ? (
    <Spinner />
  ) : (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Edit the product</h6>
            <form
              className={`${!upload.editStarted && "hideCloseBtns"}`}
              onSubmit={handleSubmit}
            >
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
                      btnType="edit"
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
                  navigation("/product");
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
                {loading ? "Loading..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
