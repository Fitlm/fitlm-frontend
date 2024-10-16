import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { ResizableBox } from "react-resizable";
import PropTypes from "prop-types";
import "react-resizable/css/styles.css"; // 기본 스타일 가져오기
import "./styles.css"; // 추가된 스타일 가져오기
import { LuRefreshCcw } from "react-icons/lu";
import axiosInstance from "../../../../utils/axios";

const FileUpload = ({
  onImageChange,
  image,
  color,
  bgDimensions,
  imgDimensions,
  setBgDimensions,
  setImgDimensions,
}) => {
  const handleDrop = useCallback(
    async (files) => {
      let formData = new FormData();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      formData.append("file", files[0]);

      try {
        const response = await axiosInstance.post(
          "/products/image",
          formData,
          config
        );
        console.log("Image upload response:", response.data);
        if (response.data.fileId) {
          onImageChange(response.data.fileId);
        } else {
          console.error("Failed to receive file ID");
        }
      } catch (error) {
        console.error("Image upload error:", error);
      }
    },
    [onImageChange]
  );

  const onBgResize = useCallback(
    (event, { size }) => {
      setBgDimensions({ width: size.width, height: size.height });
    },
    [setBgDimensions]
  );

  const onImgResize = useCallback(
    (event, { size }) => {
      setImgDimensions({ width: size.width, height: size.height });
    },
    [setImgDimensions]
  );

  const today = new Date()
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .replace(/\.$/, "");

  return (
    <div className="flex justify-center items-center">
      {image ? (
        <div style={{ position: "relative", padding: "20px" }}>
          <ResizableBox
            width={bgDimensions.width}
            height={bgDimensions.height}
            onResize={onBgResize}
            resizeHandles={["s", "e", "se"]}
            minConstraints={[
              imgDimensions.width + 40,
              imgDimensions.height + 40,
            ]}
            style={{ padding: "20px" }} // Add padding for the resize handles
          >
            <div
              className="border flex flex-col justify-center items-center"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: color,
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              <ResizableBox
                width={imgDimensions.width}
                height={imgDimensions.height}
                onResize={onImgResize}
                resizeHandles={["s", "e", "se"]}
                minConstraints={[100, 120]}
                maxConstraints={[
                  bgDimensions.width - 40,
                  bgDimensions.height - 40,
                ]}
                style={{ position: "relative" }}
              >
                <img
                  className="object-cover w-full h-full"
                  src={`${
                    import.meta.env.VITE_SERVER_URL
                  }/products/image/${image}`}
                  alt={image}
                />
              </ResizableBox>
              <div
                className="flex flex-row justify-between items-end mt-2"
                style={{
                  width: imgDimensions.width,
                  height: imgDimensions.height * 0.2,
                  fontSize: imgDimensions.width * 0.04,
                }}
              >
                <div className="flex items-center">
                  <span className="ml-2 font-semibold text-dark-color">0</span>
                  <LuRefreshCcw className="font-black text-dark-color" />
                </div>
                <span className="font-semibold text-dark-color">{today}</span>
              </div>
            </div>
          </ResizableBox>
        </div>
      ) : (
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section
              className="flex items-center justify-center cursor-pointer bg-light-color border p-2"
              style={{ width: 400, height: 480 }}
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img
                  src="/src/assets/icons/upload_image.png"
                  alt="Upload"
                  className="w-16 h-16"
                />
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  onImageChange: PropTypes.func.isRequired,
  image: PropTypes.string,
  color: PropTypes.string.isRequired,
  bgDimensions: PropTypes.object.isRequired,
  imgDimensions: PropTypes.object.isRequired,
  setBgDimensions: PropTypes.func.isRequired,
  setImgDimensions: PropTypes.func.isRequired,
};

export default FileUpload;
