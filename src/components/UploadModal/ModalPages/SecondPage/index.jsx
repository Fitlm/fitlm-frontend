import React from "react";
import PropTypes from "prop-types";
import FileUpload from "../components/FileUpload";
import InputBox from "./components/InputBox";
import axiosInstance from "../../../../utils/axios";

const SecondPage = ({
  closeModal,
  product,
  handleChange,
  handleImageChange,
  userData,
  color,
  bgDimensions,
  imgDimensions,
  setBgDimensions,
  setImgDimensions,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product,
    };

    console.log("Product data to be sent to server:", body);

    try {
      await axiosInstance.post("/products", body);
      closeModal();
    } catch (error) {
      console.error("Product upload error:", error);
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <form
        className="w-full h-full flex flex-row items-center justify-start"
        onSubmit={handleSubmit}
      >
        <div className="pr-20">
          <FileUpload
            image={product.images[0]}
            onImageChange={handleImageChange}
            color={color}
            bgDimensions={bgDimensions}
            imgDimensions={imgDimensions}
            setBgDimensions={setBgDimensions}
            setImgDimensions={setImgDimensions}
          />
        </div>
        <div className="">
          <InputBox
            label="부위"
            name="exercisePart"
            value={product.exercisePart}
            onChange={handleChange}
          />
          <InputBox
            label="시간"
            name="exerciseTime"
            type="number"
            value={product.exerciseTime}
            onChange={handleChange}
          />
          <InputBox
            label="만족도"
            name="satisfaction"
            type="number"
            value={product.satisfaction}
            onChange={handleChange}
          />
          <InputBox
            label="메모"
            name="memo"
            value={product.memo}
            onChange={handleChange}
          />
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

SecondPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  bgDimensions: PropTypes.object.isRequired,
  imgDimensions: PropTypes.object.isRequired,
  setBgDimensions: PropTypes.func.isRequired,
  setImgDimensions: PropTypes.func.isRequired,
};

export default SecondPage;
