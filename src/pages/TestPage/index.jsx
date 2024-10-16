// pages/PictureBoard.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import UploadModal from "../../components/UploadModal";

const TestPage = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get("/products", {
          params: { limit: 30, sortBy: "uploadDate", order: "desc" },
        });
        console.log("Fetched products:", response.data.products);

        const allImages = response.data.products.flatMap((product) => {
          console.log("Product images:", product.images);
          return product.images || []; // 이미지가 없을 경우 빈 배열 반환
        });

        console.log("Images to be displayed:", allImages);
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="mb-4 px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700"
        onClick={toggleModal}
      >
        Upload New Product
      </button>
      {isModalOpen && <UploadModal closeModal={toggleModal} />}
      <div className="grid grid-cols-3 gap-4">
        {images.map((imageId, index) => (
          <div key={index} className="w-full h-64">
            <img
              className="object-cover w-full h-full"
              src={`${
                import.meta.env.VITE_SERVER_URL
              }/products/image/${imageId}`}
              alt={`Product ${imageId}`}
              onError={(e) =>
                console.error(`Error loading image with ID: ${imageId}`, e)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
