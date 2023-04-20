import s from "./Uploader.module.css";
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Uploader(props) {
  const [dataFiles, setDataFiles] = useState([]);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;

    const data = new FormData();
    Array.from(files).forEach((file, i) => {
      data.append(`files`, file);
    });
    data.append("category_id", props.category_id);
    data.append("category", props.category);
    axios
      .post(`${process.env.REACT_APP_API_URL}files/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
          if (progress == 100) {
            setProgress((prev) => (prev = 2));
          } else {
            setProgress(progress + 2);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}files/get/${props.category_id}/${props.category}`
      )
      .then((res) => {
        if (res.status == 200) {
          setDataFiles(res.data.data);
        }
      });
  }, [count]);

  useEffect(() => {
    if (progress && progress < 100) {
      setTimeout(
        setProgress((prev) => (prev += 2)),
        150
      );
    }
  }, [progress]);
  const handleFileDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}files/delete/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
        }
      });
  };

  const handleFileMain = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}files/main/${props.category}/${props.category_id}/${id}`
      )
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
        }
      });
  };
  const handleDeleteAll = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}files/delete-all/${props.category_id}/${props.category}`
      )
      .then((res) => {
        if (res.status == 200) {
          setCount(count + 1);
        }
      });
  };

  return (
    <div className="modal" id="myModal">
      <div className="modal-dialog modal-dialog-scrollable modal-xl">
        <div className="modal-content" style={{ height: "100vh" }}>
          <div className="modal-header border-0">
            <h5 className="modal-title text-dark" id="myModalLabel">
              Медиа
            </h5>
            <div
              className={`${s.close}  btn btn-outline-light`}
              data-bs-dismiss="modal"
            >
              <span aria-hidden="true">×</span>
            </div>
          </div>
          <div className="modal-body border-0">
            <div className="media-header ">
              <div
                className={`${s.progress} progress progress-info progress-striped`}
              >
                <div
                  className={`${s.bar} bar2`}
                  style={{ width: `${progress}%` }}
                ></div>
                <div className={`${s.percent} percent2`}>{progress}%</div>
              </div>
              <span className={`btn ${s.btn_success} ${s.fileinput_button}`}>
                <i className="fa fa-plus" aria-hidden="true"></i>
                <span>Добавить</span>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
              </span>
              <span
                className={`btn ${s.btn_success} ${s.fileinput_button} ${s.delete_image}`}
                onClick={handleDeleteAll}
              >
                <i className="fa fa-trash"></i>
                <span>Удалить все</span>
              </span>

              {/* <span className={`btn ${s.btn_success} ${s.fileinput_button} ${s.delete_image_select}`}>
                            <i className="fa fa-trash"></i>
                            <span>Удалить выбранные</span>
                            </span> */}
            </div>
            <div id="reset" className={s.media_block}>
              <ul
                className={`${s.thumbnails} list-unstyled ui-sortable`}
                id="media_list"
              >
                {dataFiles
                  ? dataFiles.map((item, index) => {
                      if (item.file_ext == ".jpeg" || item.file_ext == ".jpg") {
                        return (
                          <li className={s.thumb} key={index}>
                            <a
                              href={`${process.env.REACT_APP_FILE_URL}${item.file_name}`}
                              className={`${s.thumbnail} fancybox ${s.tooltips}`}
                              rel="group"
                            >
                              <img
                                src={`${process.env.REACT_APP_FILE_URL}${item.file_name}`}
                              />
                            </a>
                            <div className={s.toolbar}>
                              <div className={`btn-group ${s.btn_group}`}>
                                <div
                                  className={`${s.btn} btn btn-mini ${
                                    item.is_main == "1" ? s.btn_info : ""
                                  } ajax_set_main`}
                                  onClick={() => handleFileMain(item.id)}
                                  title="Сделать Главным"
                                >
                                  <i className="fa fa-arrow-up"></i>
                                </div>
                                <div
                                  className={`${s.btn} btn btn-mini btn-delete ajax_delete`}
                                  onClick={() => handleFileDelete(item.id)}
                                  title="Удалить"
                                >
                                  <i className="fa fa-trash"></i>
                                </div>
                              </div>
                              {/* <div className={`${s.btn} btn btn-mini ${s.check}`}>
                                                        <input type="checkbox" value="39" id="39" name="img[]"/>
                                                        <label htmlFor="39"><span></span></label>
                                                    </div> 		 */}
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li className={s.thumb} key={index}>
                            <a
                              href={`${process.env.REACT_APP_FILE_URL}${item.file_name}`}
                              className={`${s.thumbnail} fancybox ${s.tooltips}`}
                              rel="group"
                            >
                              <i className="fa fa-file" aria-hidden="true"></i>
                            </a>
                            <div className={s.toolbar}>
                              <div className={`btn-group ${s.btn_group}`}>
                                <div
                                  className={`${s.btn} btn btn-mini ${
                                    item.is_main == "1" ? s.btn_info : ""
                                  }  ajax_set_main`}
                                  onClick={() => handleFileMain(item.id)}
                                  title="Сделать Главным"
                                >
                                  <i className="fa fa-arrow-up"></i>
                                </div>
                                <div
                                  className={`${s.btn} btn btn-mini btn-delete ajax_delete`}
                                  onClick={() => handleFileDelete(item.id)}
                                  title="Удалить"
                                >
                                  <i className="fa fa-trash"></i>
                                </div>
                              </div>
                              {/* <div className={`${s.btn} btn btn-mini ${s.check}`}>
                                                        <input type="checkbox" value="39" id="39" name="img[]"/>
                                                        <label htmlFor="39"><span></span></label>
                                                    </div> 		 */}
                            </div>
                          </li>
                        );
                      }
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
