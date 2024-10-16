import React, { useState } from "react";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import { useSelector } from "react-redux";
import FirstPage from "./ModalPages/FirstPage";
import SecondPage from "./ModalPages/SecondPage";

const UploadModal = ({ closeModal }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [product, setProduct] = useState({
    images: [],
    exercisePart: "",
    exerciseTime: 0,
    satisfaction: 0,
    memo: "",
  });
  const [color, setColor] = useState("#ffffff");
  const [bgDimensions, setBgDimensions] = useState({ width: 500, height: 600 });
  const [imgDimensions, setImgDimensions] = useState({
    width: 400,
    height: 480,
  });
  const userData = useSelector((state) => state.user?.userData);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const handleImageChange = (newImage) => {
    setProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, newImage],
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-3/5 h-4/5 flex items-center justify-center">
        <button
          className="absolute top-2 right-2 text-2xl font-bold"
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="w-full h-full flex items-center justify-center">
          {currentStep === 0 && (
            <FirstPage
              onImageChange={handleImageChange}
              image={product.images[0]}
              onColorChange={setColor}
              color={color}
              bgDimensions={bgDimensions}
              imgDimensions={imgDimensions}
              setBgDimensions={setBgDimensions}
              setImgDimensions={setImgDimensions}
            />
          )}
          {currentStep === 1 && (
            <SecondPage
              closeModal={closeModal}
              product={product}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              userData={userData}
              color={color}
              bgDimensions={bgDimensions}
              imgDimensions={imgDimensions}
              setBgDimensions={setBgDimensions}
              setImgDimensions={setImgDimensions}
            />
          )}
        </div>
        <div className="absolute bottom-2 left-2">
          {currentStep > 0 && (
            <button onClick={handlePrev}>
              <LuArrowLeft className="text-xl" />
            </button>
          )}
        </div>
        <div className="absolute bottom-2 right-2">
          {currentStep < 1 && (
            <button onClick={handleNext}>
              <LuArrowRight className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
