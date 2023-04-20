import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoMdArrowDroprightCircle,
  IoMdArrowDropleftCircle,
} from "react-icons/io";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import "./Teachers.scss";
import { useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getContent } from "../../utils/changeLang";

const images = [
  {
    id: 1,
    src: "/images/teachers-img1.png",
    alt: "Image 1",
    title: "Title 1",
    description:
      "fldaskfjls fdslfjs kdlf safjakfl sdfjsd lfdjkfl asfdjf saldflj",
    date: "Date 1",
  },
  {
    id: 2,
    src: "/images/teachers-img1.png",
    alt: "Image 2",
    title: "Title 2",
    description:
      "fijldsajfsl fdfjl affjsl fdjsfl ksadjflf dsjlfk sdjfdsl  jfd fdajfkl afj lj alsfjd fls",
    date: "Date 2",
  },
  {
    id: 2,
    src: "/images/teachers-img1.png",
    alt: "Image 2",
    title: "Title 2",
    description:
      "fijldsajfsl fdfjl affjsl fdjsfl ksadjflf dsjlfk sdjfdsl  jfd fdajfkl afj lj alsfjd fls",
    date: "Date 2",
  },
  {
    id: 2,
    src: "/images/teachers-img1.png",
    alt: "Image 2",
    title: "Title 2",
    description:
      "fijldsajfsl fdfjl affjsl fdjsfl ksadjflf dsjlfk sdjfdsl  jfd fdajfkl afj lj alsfjd fls",
    date: "Date 2",
  },
  {
    id: 1,
    src: "/images/teachers-img1.png",
    alt: "Image 1",
    title: "Title 1",
    description:
      "fldaskfjls fdslfjs kdlf safjakfl sdfjsd lfdjkfl asfdjf saldflj",
    date: "Date 1",
  },
  {
    id: 2,
    src: "/images/teachers-img1.png",
    alt: "Image 2",
    title: "Title 2",
    description:
      "fijldsajfsl fdfjl affjsl fdjsfl ksadjflf dsjlfk sdjfdsl  jfd fdajfkl afj lj alsfjd fls",
    date: "Date 2",
  },
  {
    id: 2,
    src: "/images/teachers-img1.png",
    alt: "Image 2",
    title: "Title 2",
    description:
      "fijldsajfsl fdfjl affjsl fdjsfl ksadjflf dsjlfk sdjfdsl  jfd fdajfkl afj lj alsfjd fls",
    date: "Date 2",
  },
  // add more image objects as needed
];

function CustomLeftArrow({ className, style, onClick }) {
  return (
    <IoMdArrowDropleftCircle
      style={{
        ...style,
      }}
      className={className}
      onClick={onClick}
    />
  );
}
function CustomRightArrow({ className, style, onClick }) {
  return (
    <IoMdArrowDroprightCircle
      style={{
        ...style,
      }}
      className={className}
      onClick={onClick}
    />
  );
}

const Teachers = () => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}teachers/get-main`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data?.data?.result);
        }
      });
  }, []);

  useEffect(() => {
    setSelectedImage(data[0]);
  }, [data]);

  let slidesShow = data?.length >= 5 ? 5 : data?.length;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesShow,
    centerMode: true,
    slidesToScroll: 1,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1052,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          variableHeight: true,
        },
      },
    ],
  };

  const { t } = useTranslation();

  const isDesktop = useMediaQuery("(min-width:900px)");

  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const handleAnimation = async () => {
    if (inView) {
      await controls1.start({ y: 0, opacity: 1 });
      await controls2.start({ y: 0, opacity: 1 });
    } else {
      await controls1.start({ y: 50, opacity: 0 });
      await controls2.start({ y: 50, opacity: 0 });
    }
  };

  function handleClick(image) {
    setSelectedImage(image);
  }

  function handleHover(image) {
    setSelectedImage(image);
  }

  useEffect(() => {
    handleAnimation();
  }, [inView]);

  return (
    <section className="teachers" ref={ref}>
      <div className="teachers__container">
        <h1 className="teachers__title">{t("teacher.header")}</h1>
      </div>
      {/* <div className="teachers__img-wrapper">
        {images.map((img, i) =>
          isDesktop ? (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={controls1}
              transition={{ duration: 0.5, type: "tween" }}
              className="teachers__img"
              key={i}
            >
              <img src={img} alt="teachers" />
            </motion.div>
          ) : (
            <div className="teachers__img" key={i}>
              <img src={img} alt="teachers" />
            </div>
          )
        )}

      </div> */}
      <div className="slider-container">
        <div className="teachers__img-wrapp">
          <Slider
            {...settings}
            nextArrow={<CustomRightArrow />}
            prevArrow={<CustomLeftArrow />}
          >
            {data?.map((img, i) => (
              <div
                className={`teachers__img`}
                key={i}
                onClick={() => handleClick(img)}
                onMouseOver={() => handleHover(img)}
              >
                <img
                  src={process.env.REACT_APP_FILE_URL + img?.file_name}
                  alt="teachers"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="teachers__container">
        {isDesktop ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={controls2}
            transition={{ duration: 0.5, type: "tween" }}
            className="teachers__info-wrapper"
          >
            <div className="teachers__info-left">
              <h1>
                {getContent(selectedImage?.name_ru, selectedImage?.name_uz)}
              </h1>
              <p className="teachers__info-p">
                {getContent(
                  selectedImage?.short_content_ru,
                  selectedImage?.short_content_uz
                )}
              </p>
            </div>
            <div className="teachers__info-right">
              <p>{t("teacher.info")}</p>
            </div>
          </motion.div>
        ) : (
          <div className="teachers__info-wrapper">
            <div className="teachers__info-left">
              <h1>Horem ipsum </h1>
              <p className="teachers__info-p">
                Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Curabitur tempus.
              </p>
            </div>
            <div className="teachers__info-right">
              <p>{t("teacher.info")}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teachers;
