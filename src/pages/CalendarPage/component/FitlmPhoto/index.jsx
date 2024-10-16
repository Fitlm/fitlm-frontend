import React, { useEffect, useState } from "react";
import FrontCard from "./component/FrontCard";
import BackCard from "./component/BackCard";
import "./index.css";

const FitlmPhoto = ({
  exerciseInfo,
  isFlipped,
  setIsFlipped,
  onImageRemoved,
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: "auto",
    height: "auto",
  });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRemoveImage = async () => {
    try {
      const userId = await fetchAuthenticatedUser(); // 비동기로 사용자 ID 가져오기
      await deleteProduct(userId, exerciseInfo.date); // 비동기로 deleteProduct 호출
      console.log("Image removed");
      onImageRemoved(); // 이미지가 삭제된 후 콜백 호출
    } catch (error) {
      console.error("Error in deleting product:", error);
    }
  };

  useEffect(() => {
    if (!exerciseInfo.image) {
      setIsFlipped(false);
    }
  }, [exerciseInfo.image]);

  return (
    <div className="scene" onClick={handleFlip}>
      <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card__face card__face--front">
          <FrontCard
            handleFlip={handleFlip}
            exerciseInfo={exerciseInfo}
            setImageDimensions={setImageDimensions}
            imageDimensions={imageDimensions}
          />
        </div>
        <div className="card__face card__face--back">
          <BackCard
            exerciseInfo={exerciseInfo}
            imageDimensions={imageDimensions}
            onRemove={handleRemoveImage} // onRemove 핸들러 전달
          />
        </div>
      </div>
    </div>
  );
};

export default FitlmPhoto;

async function fetchAuthenticatedUser() {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기 (또는 쿠키 등 다른 저장소)

  try {
    const response = await fetch("http://localhost:4000/users/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 토큰 포함
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const user = await response.json(); // 응답 데이터를 user 변수에 저장
    console.log("Authenticated user:", user); // user 변수 출력 (디버깅용)

    // 여기서 user 변수를 사용하여 필요한 작업 수행
    // 예: user.email, user.name 등
    console.log(user.userId);
    return user.userId;
  } catch (error) {
    console.error("Failed to fetch authenticated user:", error);
    throw error; // 오류를 다시 던져서 함수 호출자가 처리할 수 있게 함
  }
}

async function deleteProduct(userId, date) {
  try {
    const response = await fetch(
      `http://localhost:4000/products/delete?userId=${userId}&date=${date}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Product deleted successfully:", result);
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}
