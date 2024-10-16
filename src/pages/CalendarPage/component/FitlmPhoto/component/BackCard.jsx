import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Footer from "./Footer";

const emojiMap = {
  emoji1: "/images/emoji/emoji1.svg",
  emoji2: "/images/emoji/emoji2.svg",
  emoji3: "/images/emoji/emoji3.svg",
  emoji4: "/images/emoji/emoji4.svg",
  emoji5: "/images/emoji/emoji5.svg",
  emoji6: "/images/emoji/emoji6.svg",
  emoji7: "/images/emoji/emoji7.svg",
};

const BackCard = ({ exerciseInfo, imageDimensions, onRemove }) => {
  const fontSize = Math.min(imageDimensions.width, imageDimensions.height) / 10;

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        backgroundColor: exerciseInfo.image ? exerciseInfo.color : "white",
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
      {exerciseInfo.image ? (
        <>
          <button
            className="absolute top-2 right-2 text-gray"
            onClick={onRemove}
          >
            <AiOutlineClose size={18} />
          </button>
          <div
            className="flex flex-col items-center object-cover bg-light-color justify-evenly"
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
              maxWidth: "50vh",
              maxHeight: "50vh",
              fontSize: fontSize,
            }}
          >
            <p
              className=" font-semibold text-semi-dark-color"
              style={{ fontSize: `${fontSize * 1.2}px` }}
            >
              {exerciseInfo.time}
            </p>
            <p
              className=" font-semibold text-semi-dark-color"
              style={{ fontSize: `${fontSize * 1.2}px` }}
            >
              {exerciseInfo.type}
            </p>
            <div className="flex items-center justify-center">
              <img
                src={emojiMap[exerciseInfo.emotion]}
                alt={exerciseInfo.emotion}
                className="object-cover h-28"
              />
            </div>
            <p
              className=" font-normal text-semi-dark-color"
              style={{ fontSize: `${fontSize}px` }}
            >
              {exerciseInfo.motivation}
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mt-3.5 w-[23.5vw] h-[75vh] max-h-[75vh] font-bold text-xl">
          <p
            className="text-lg font-semibold text-semi-dark-color"
            style={{ fontSize: `${fontSize}px` }}
          >
            이날 운동을 하지 않았습니다.
          </p>
        </div>
      )}
      <Footer exerciseInfo={exerciseInfo} />
    </div>
  );
};

export default BackCard;
