import React, { useMemo, useRef } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditorText from "../../../layouts/editorText/EditorText";
import slug from "slug";
import Switch from "../../../layouts/switch/Switch";
import axios from "axios";
import Uploader from "../../../layouts/uploader/Uploader";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";
import { baseUrl } from "../../../../shared/constants";
import Slider from "react-slick";
import Spinner from "../../../spinner";
import { BsTelephoneOutbound } from "react-icons/bs";

import styles from "./style.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function MenuView() {
  const [data, setData] = useState({});
  const [{ page, api }, setLoading] = useState({ page: true });
  const params = useParams();
  const id = params.id;
  const navigation = useNavigate();
  const [lang, setLang] = useState([]);

  const { i18n } = useTranslation();

  const translatedProductName = i18n.language === "uz" ? "titleUz" : "titleRu";

  const getOrderItem = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, page: true }));
      const { data } = await axios.get(`${baseUrl}/order/${id}`);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  };
  useEffect(() => {
    console.log("useEffect");
    getOrderItem(id);
  }, []);

  console.log(data);

  // const handleChange = (event) => {
  //   const inputName = event.target.name;
  //   const inputValue = event.target.value;
  //   const lang = event.target.lang;
  //   if (lang) {
  //     let nameIn = inputName + "_" + lang;
  //     if (inputName == "title") {
  //       const slugifyTest = slug(inputValue, { locale: "bg" });
  //       setData((oldValue) => ({ ...oldValue, ["alias"]: slugifyTest }));
  //     }
  //     // setData(oldValue=>({...oldValue, [inputName]: {...oldValue[inputName],  [lang]:inputValue}}))
  //     setData((oldValue) => ({ ...oldValue, [nameIn]: inputValue }));
  //   } else {
  //     setData((oldValue) => ({ ...oldValue, [inputName]: inputValue }));
  //   }
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (data.title_ru.length > 0) {
  //     data.created_on = Math.floor(new Date(data.created_on).getTime() / 1000);

  //     axios
  //       .put(`${process.env.REACT_APP_API_URL}menu/update/${id}`, data)
  //       .then((res) => {
  //         if (res.status == 200) {
  //           navigation("/admin/menu", { replace: true });
  //         }
  //       });
  //   } else {
  //     NotificationManager.warning(
  //       "Please fill in the fields",
  //       "Form validation",
  //       3000
  //     );
  //   }
  // };

  const numberFormatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "UZS",
  });
  return page ? (
    <Spinner />
  ) : (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">
              Order by <span className="text-info">John Doe</span>
            </h6>
            <div className={`${styles.productContainer} row`}>
              <ProductImages productData={data.product.attachmentContents} />
              <div className="col ">
                <table class="table bg-transparent">
                  <thead>
                    <tr>
                      <th className="text-center" colSpan={2} scope="col">
                        Order Detils
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{data.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Message</th>
                      <td>{data.message}</td>
                    </tr>
                    <tr>
                      <th scope="row">Ordered time</th>
                      <td>
                        {moment(data.orderedTime).format("HH:mm | DD.MM.YYYY")}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Phone number</th>
                      <td>
                        <a
                          className="text-muted"
                          href={`tel:+${data.phoneNumber}`}
                        >
                          {data.phoneNumber} <BsTelephoneOutbound />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th class="fit-content" scope="row">
                        Product name
                      </th>
                      <td>{data.product[translatedProductName]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Price</th>
                      <td>{numberFormatter.format(data.product.price)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Quantity</th>
                      <td>{data.quantity}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total</th>
                      <td>
                        {numberFormatter.format(
                          data.product.price * data.quantity
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Link className="btn btn-warning" to={"/order"}>
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 *     Subcomponents
 */

const ProductImages = ({ productData }) => {
  const [autoplay, setAutoPlay] = useState(false);
  console.log(productData);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 100,
    pauseOnHover: true,
  };

  if (!productData.length) return null;

  return (
    <div className={`${styles.sliderContainer} col mx-auto col-auto`}>
      <div className=" w-full mx-auto">
        <Slider autoplay={autoplay} {...settings}>
          {productData.map((item) => (
            <div>
              <img
                className="img-cover"
                width={250}
                height={350}
                src={`data:image/png;base64,${item.data}`}
                alt=""
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
