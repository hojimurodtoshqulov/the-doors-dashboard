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
import { useRef } from "react";

export default function VideoSubmit() {
  const { id } = useParams();
  const { jwtApi } = useJwtApi();

  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [key, setKey] = useState(0);

  const [vidoeLoading, setVidoeLoading] = useState({
    complete: 0,
    started: false,
    totalSize: 0,
    sentSize: 0,
  });

  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVidoeLoading((prev) => ({ ...prev, totalSize: file.size }));
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVideoFile(file);
        setVideoUrl(reader.result);
        setKey(key + 1); // update the key to re-render the video component
      };
    }
  };

  const getVideo = async () => {
    try {
      setPageLoad(true);
      setVideoUrl(`https://the-doors.herokuapp.com/api/files/470`);
      setVideoFile(null);
    } catch (error) {
    } finally {
      setPageLoad(false);
    }
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      if (!videoFile) throw new Error("Insert video");
      const formData = new FormData();
      formData.append("file", videoFile);
      const res = await axios.post(`${baseUrl}/files/470`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      NotificationManager.success("Video sent", "Success");
      getVideo();
      console.log(res);
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong", "Error");
    } finally {
      setLoading(false);
    }
  };

  const uploadVideo = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        console.log(event.total);
        const percentComplete = Math.round((event.loaded / event.total) * 100);

        setVidoeLoading({
          complete: percentComplete,
          started: true,
          totalSize: event.total,
          sentSize: event.loaded,
        });

        // Update state with the percent complete
      });

      xhr.onload = (e) => {
        resolve(e);
      };

      xhr.onerror = (e) => {
        reject(e);
      };

      xhr.open("POST", `${baseUrl}/files/470`);

      // Set authorization header
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );

      const formData = new FormData();
      formData.append("file", file);

      xhr.send(formData);
    });
  };

  useEffect(() => {
    getVideo();
    setLoading(false);
  }, []);

  return pageLoad ? (
    <Spinner />
  ) : (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100  rounded  justify-content-center mx-0">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Update video</h6>
            <div className="video_wrapper">
              {videoFile && (
                <>
                  <button
                    disabled={vidoeLoading.started}
                    onClick={() =>
                      uploadVideo(videoFile)
                        .then(() => {
                          setVidoeLoading((prev) => ({
                            ...prev,
                            started: false,
                          }));
                          NotificationManager.success("Video sent", "Success");
                          getVideo();
                        })
                        .catch((e) => {
                          console.log(e);
                          NotificationManager.error(
                            "Something went wrong",
                            "Error"
                          );
                          getVideo();
                        })
                    }
                    className="btn btn-warning"
                  >
                    {!vidoeLoading.started ? "Send video" : "Loading"}
                  </button>
                  <div className="progress-box">
                    <div className="progress-data-info">
                      <span>
                        {(vidoeLoading.sentSize / 2 ** 20).toFixed(2)}MB /{" "}
                        {(vidoeLoading.totalSize / 2 ** 20).toFixed(2)}MB
                      </span>
                      <span>{vidoeLoading.complete}%</span>
                    </div>
                    <div className="progress-path">
                      <span
                        style={{ width: `${vidoeLoading.complete}%` }}
                        className="completed-progress"
                      ></span>
                    </div>
                  </div>
                </>
              )}
              <input type="file" accept="video/*" onChange={handleFileChange} />
              {videoUrl && (
                <video key={key + 1} controls width="400">
                  <source src={videoUrl} type={videoUrl.type} />
                  Your browser does not support HTML5 video.
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
