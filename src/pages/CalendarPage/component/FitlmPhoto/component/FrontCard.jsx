import React, { useEffect } from "react";
import Footer from "./Footer";

const FrontCard = ({
  handleFlip,
  exerciseInfo,
  setImageDimensions,
  imageDimensions,
}) => {
  const { image, color } = exerciseInfo;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = `${serverUrl}/products/image/${image}`;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let width, height;

        if (img.width > img.height) {
          width = "50vh";
          height = `calc(50vh / ${aspectRatio})`;
        } else {
          width = `calc(50vh * ${aspectRatio})`;
          height = "50vh";
        }

        setImageDimensions({
          width,
          height,
        });
      };
    }
  }, [serverUrl, image, setImageDimensions]);

  return (
    <div
      className="relative flex flex-col items-center justify-center text-dark-color"
      style={{
        backgroundColor: image ? color : "white",
        width: `calc(${imageDimensions.width} + 2.5rem)`,
        height: `calc(${imageDimensions.height} + 7rem)`,
        maxWidth: "calc(50vh + 2.5rem)",
        maxHeight: "calc(50vh + 7rem)",
      }}
    >
      <img
        src="/images/tapes/tape1.png"
        alt="Tape"
        className="absolute top-0 transform -translate-y-1/2"
        style={{ width: "25px", height: "70px" }}
      />
      {image ? (
        <img
          src={`${serverUrl}/products/image/${image}`}
          alt="User Workout"
          className="object-cover"
          style={{
            width: imageDimensions.width,
            height: imageDimensions.height,
            maxWidth: "50vh",
            maxHeight: "50vh",
          }}
        />
      ) : (
        <div className="flex items-center justify-center mt-3.5 w-[23.5vw] h-[75vh] max-h-[75vh] font-bold text-xl">
          <p>이날 운동을 하지 않았습니다.</p>
        </div>
      )}
      <Footer exerciseInfo={exerciseInfo} />
    </div>
  );
};

export default FrontCard;
