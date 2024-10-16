import React from "react";
import FileUpload from "../components/FileUpload";

const colors = [
  "#FFE7E7",
  "#F3FFE7",
  "#DFF9FF",
  "#F2E7FF",
  "#F1EBE9",
  "#FFFFFF",
  "#111111",
]; // 색상 목록

const FirstPage = ({
  onImageChange,
  image,
  onColorChange,
  color,
  bgDimensions,
  imgDimensions,
  setBgDimensions,
  setImgDimensions,
}) => {
  const handleColorClick = (event, colorOption) => {
    event.preventDefault(); // 기본 동작 방지
    onColorChange(colorOption);
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <form className="w-full h-full flex flex-row items-center justify-start">
        <div className="pr-20">
          <FileUpload
            image={image}
            onImageChange={onImageChange}
            color={color}
            bgDimensions={bgDimensions}
            imgDimensions={imgDimensions}
            setBgDimensions={setBgDimensions}
            setImgDimensions={setImgDimensions}
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="mb-4 text-left text-dark-color font-semibold">
            Frame Color
          </h3>
          <div className="flex space-x-2">
            {colors.map((colorOption) => (
              <button
                key={colorOption}
                className={`w-8 h-8 rounded-full ${
                  colorOption === "#FFFFFF" ? "border border-black" : ""
                }`}
                style={{ backgroundColor: colorOption }}
                onClick={(event) => handleColorClick(event, colorOption)}
              />
            ))}
          </div>
        </div>
      </form>
    </section>
  );
};

export default FirstPage;
