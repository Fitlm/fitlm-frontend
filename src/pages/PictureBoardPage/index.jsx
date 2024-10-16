import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const PictureBoardPage = () => {
  useEffect(() => {
    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // 동기적으로 로드
      script.onload = callback;
      document.body.appendChild(script);
    };

    const scriptResources = [
      "/scripts/resource.js",
      "/scripts/drag.js",
      "/scripts/flip.js",
      "/scripts/set.js",
      "/scripts/uproad.js",
      "/scripts/test.js",
      "/scripts/save.js",
    ];

    let index = 0;
    const loadNextScript = () => {
      if (index < scriptResources.length) {
        loadScript(scriptResources[index], loadNextScript);
        index++;
      }
    };

    const externalStyles = [
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css",
    ];

    externalStyles.forEach((href) => {
      const linkElement = document.createElement("link");
      linkElement.href = href;
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      document.head.appendChild(linkElement);
    });

    const externalScripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.10.5/html-to-image.min.js",
    ];

    externalScripts.forEach((src) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = src;
      scriptElement.async = false;
      document.body.appendChild(scriptElement);
    });

    loadNextScript();

    return () => {
      externalStyles.forEach((href) => {
        const linkElement = document.querySelector(`link[href="${href}"]`);
        if (linkElement) {
          document.head.removeChild(linkElement);
        }
      });

      externalScripts.forEach((src) => {
        const scriptElement = document.querySelector(`script[src="${src}"]`);
        if (scriptElement) {
          document.body.removeChild(scriptElement);
        }
      });

      scriptResources.forEach((script) => {
        const scriptElement = document.querySelector(`script[src="${script}"]`);
        if (scriptElement) {
          document.body.removeChild(scriptElement);
        }
      });
    };
  }, []);

  const handleUpload = () => {
    const productData = {
      userId: "exampleUserId", // 예시 사용자 ID, 실제로는 적절한 값으로 대체
      imageName: "exampleImageName", // 예시 이미지 이름, 실제로는 적절한 값으로 대체
      color: "#ffffff",
      date: "2024-06-19", // 예시 날짜, 실제로는 적절한 값으로 대체
      part: "examplePart",
      satisfactionId: "exampleSatisfactionId",
      time: 60,
      memo: "exampleMemo",
    };
  };

  return (
    <div id="contentContainer">
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />
      <div id="mainContent">
        <div id="boardContainer">
          <div id="topContainer">
            <label>
              <button id="show" style={{ height: 40 }}>
                15 Days
              </button>
            </label>
          </div>
          <div id="leftTopContainer">
            <label>
              <button id="save">
                <img
                  src="images/save.png"
                  alt="Save"
                  className="Buttonicon"
                  style={{ height: "13px", width: "13px", marginRight: "5px" }}
                />
              </button>
            </label>
          </div>
          <div id="leftDownContainer">
            <label>
              <button
                id="uproadALL"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                <img
                  src="images/uproad.png"
                  alt="Upload All"
                  style={{ margin: "0" }}
                  className="Buttonicon"
                />
              </button>
            </label>
          </div>
          <div id="imageContainer"></div>
          <div id="transformContainer">
            <label>
              <button id="move" style={{ height: 40 }}>
                MOVE
                <img src="images/move.png" alt="Move" className="Buttonicon" />
              </button>
              <button id="tilt" style={{ marginLeft: 10, height: 40 }}>
                ROTATE
                <img
                  src="images/tilt.png"
                  alt="Rotate"
                  className="Buttonicon"
                />
              </button>
            </label>
          </div>
          <div id="uproadContainer">
            <label>
              <button id="capture" style={{ height: 40 }}>
                CAPTURE
                <img
                  src="images/capture.png"
                  style={{ marginTop: 3 }}
                  alt="Capture"
                  className="Buttonicon"
                />
              </button>
            </label>
            <label>
              <button id="uproad" style={{ height: 40 }} onClick={handleUpload}>
                UPLOAD
                <img
                  src="images/uproad.png"
                  style={{ marginTop: 3 }}
                  alt="Upload"
                  className="Buttonicon"
                />
              </button>
            </label>
          </div>
        </div>

        <div id="popup" className="popup">
          <div className="popup-content">
            <span className="close-btn">&times;</span>
            <div className="popup-inner-content">
              <div className="popup-image-container" id="imageUploadContainer">
                <div className="image-rectangle">
                  <img
                    src="images/image.png"
                    alt="Uploaded"
                    id="uploadedImage"
                  />
                </div>
                <input
                  type="file"
                  id="popupImageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
              <div className="popup-form-container">
                <div
                  className="popup-form-group"
                  style={{ marginTop: "-20px" }}
                >
                  <label htmlFor="day">날짜</label>
                  <input type="date" id="date" />
                </div>
                <div className="popup-form-group">
                  <label htmlFor="part">운동</label>
                  <input
                    type="text"
                    id="part"
                    placeholder="Running, Swimming, Tennis..."
                  />
                </div>
                <div className="popup-form-group">
                  <label htmlFor="time">시간</label>
                  <input type="text" id="time" placeholder="ex) 60min" />
                </div>
                <div className="popup-form-group">
                  <label htmlFor="satisfaction">만족도</label>
                  <div
                    id="satisfaction"
                    style={{ marginTop: "0px", marginBottom: "-8px" }}
                  >
                    <img
                      id="emoji1"
                      className="satisfaction-img"
                      src="images/emoji/emoji1.svg"
                      alt="Satisfaction 1"
                    />
                    <img
                      id="emoji2"
                      className="satisfaction-img"
                      src="images/emoji/emoji2.svg"
                      alt="Satisfaction 2"
                    />
                    <img
                      id="emoji3"
                      className="satisfaction-img"
                      src="images/emoji/emoji3.svg"
                      alt="Satisfaction 3"
                    />
                    <img
                      id="emoji4"
                      className="satisfaction-img"
                      src="images/emoji/emoji4.svg"
                      alt="Satisfaction 4"
                    />
                    <img
                      id="emoji5"
                      className="satisfaction-img"
                      src="images/emoji/emoji5.svg"
                      alt="Satisfaction 5"
                    />
                    <img
                      id="emoji6"
                      className="satisfaction-img"
                      src="images/emoji/emoji6.svg"
                      alt="Satisfaction 6"
                    />
                    <img
                      id="emoji7"
                      className="satisfaction-img"
                      src="images/emoji/emoji7.svg"
                      alt="Satisfaction 7"
                    />
                  </div>
                </div>
                <div className="popup-form-group">
                  <label htmlFor="color" style={{ verticalAlign: "middle" }}>
                    색상
                  </label>
                  <input
                    type="color"
                    id="ColorPicker"
                    value="#ffffff"
                    style={{
                      verticalAlign: "middle",
                      padding: "1px",
                      width: "30px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                  />
                </div>
                <label htmlFor="memo">메모</label>
                <textarea
                  id="memo"
                  placeholder="Write Something…"
                  style={{ marginBottom: "-20px" }}
                ></textarea>
              </div>
            </div>
            <div id="popupBtnContainer">
              <button id="submit">
                SUBMIT
                <img
                  src="images/uproad.png"
                  style={{ marginTop: 4, marginLeft: 0 }}
                  alt="Submit"
                  className="Buttonicon"
                />
              </button>
            </div>
          </div>
        </div>
        <div id="overlay" className="overlay"></div>
      </div>
    </div>
  );
};

export default PictureBoardPage;
