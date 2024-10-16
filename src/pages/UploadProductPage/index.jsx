import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import FileUpload from "../../components/UploadModal/ModalPages/components/FileUpload"; // 올바른 경로로 수정
import PropTypes from "prop-types";
import InputBox from "./component/InputBox";

const UploadProductPage = ({ closeModal }) => {
  const [product, setProduct] = useState({
    images: [], // 이미지 배열로 변경
    exercisePart: "",
    exerciseTime: 0,
    satisfaction: 0,
    memo: "",
  });

  const userData = useSelector((state) => state.user?.userData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (newImage) => {
    console.log("Image ID received from FileUpload:", newImage);
    setProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, newImage], // 배열에 이미지 추가
    }));
  };

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
    <section className="">
      <form className="flex flex-row items-center" onSubmit={handleSubmit}>
        <div className="w-1/2 h-4/5 pr-20">
          <FileUpload
            image={product.images[0]}
            onImageChange={handleImageChange}
          />
        </div>
        <div className="w-1/2">
          <InputBox
            label="운동 부위"
            name="exercisePart"
            value={product.exercisePart}
            onChange={handleChange}
          />
          <InputBox
            label="운동 시간(분 단위)"
            name="exerciseTime"
            type="number"
            value={product.exerciseTime}
            onChange={handleChange}
          />
          <InputBox
            label="운동 만족도"
            name="satisfaction"
            type="number"
            value={product.satisfaction}
            onChange={handleChange}
          />
          <InputBox
            label="추가 메모"
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

UploadProductPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default UploadProductPage;
