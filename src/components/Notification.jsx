import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

async function fetchProductsByWriter(userId) {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기

  if (!userId) {
    console.error("UserId is undefined");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/products?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 토큰 포함
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const products = data.products;
    console.log(products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// user 정보 가져오기 -> userId 정보
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

function NotificationModal({ show, handleClose, data, accessToken }) {
  const [visibleData, setVisibleData] = useState(data);
  const [isUploaded, setIsUploaded] = useState(false); // 업로드 여부 상태
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    if (show) {
      setVisibleData(data);
      fetchUserProducts(); // 컴포넌트가 보일 때마다 사용자의 product 데이터 가져오기
    }
  }, [show, data]);

  // 사용자의 product 데이터를 서버에서 가져오는 함수
  const fetchUserProducts = async () => {
    try {
      const userId = await fetchAuthenticatedUser(accessToken); // 사용자 ID 가져오기
      const products = await fetchProductsByWriter(userId); // 사용자의 product 데이터 가져오기

      setUserProducts(products); // 받아온 product 데이터를 상태에 저장
      checkUploadStatus(products); // 업로드 상태 체크
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  // 업로드 상태를 체크하는 함수
  const checkUploadStatus = (products) => {
    if (!products) return;

    const today = new Date();
    const formattedToday = `${today.getFullYear()}. ${
      today.getMonth() + 1
    }. ${today.getDate()}.`;

    // 오늘 날짜와 일치하는 데이터가 있는지 확인
    const found = products.some((item) => item.date === formattedToday);

    setIsUploaded(found); // 업로드 상태 업데이트
  };

  const handleRemoveNotification = (id) => {
    const newData = visibleData.filter((item) => item._id !== id);
    setVisibleData(newData);
  };

  if (!show) return null;

  const modalStyle = {
    position: "fixed",
    borderRadius: "20px",
    top: "50px",
    left: "20%",
    width: "400px",
    height: "80%",
    backgroundColor: "#B09C93",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10000000,
    gap: "20px", // 각 컨텐츠들 사이의 간격 설정
  };

  const modalContentStyle = {
    display: "flex",
    width: "350px",
    flexDirection: "column",
    overflowY: "auto",
    backgroundColor: "#fcf5f3",
    borderRadius: "10px",
    boxShadow: "0px 4px 3px #0000001a",
    padding: "10px",
  };

  const quickTipInstanceStyle = {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // 왼쪽 정렬
    position: "relative",
    zIndex: 10000000,
  };

  const textStyle = {
    fontWeight: "bold", // 굵게 설정
    fontSize: "14px", // 폰트 크기 설정
  };

  const centeredTextStyle = {
    fontWeight: "bold", // 굵게 설정
    fontSize: "18px",
    textAlign: "center", // 중앙 정렬
  };

  const buttonStyle = {
    backgroundColor: "#B09C93", // div 색상
    border: "none",
    padding: "2px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "12px", // 폰트 크기 설정
    marginLeft: "auto", // 버튼을 오른쪽으로 정렬
  };

  const closeButtonStyle = {
    backgroundColor: "#B09C93",
    border: "none",
    padding: "5px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "auto", // 상단 여백을 자동으로 조정하여 최하단에 위치
    marginBottom: "10px", // 모달과의 간격을 10px로 설정
    alignSelf: "center", // 중앙에 위치하게 설정
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        {isUploaded ? (
          <div style={{ ...quickTipInstanceStyle, alignItems: "center" }}>
            <p style={centeredTextStyle}>오 운 완 ~~ !</p>
          </div>
        ) : (
          <div style={{ ...quickTipInstanceStyle, alignItems: "center" }}>
            <p style={centeredTextStyle}>아직 업로드 전이군요!</p>
          </div>
        )}
      </div>

      <div style={modalContentStyle}>
        {visibleData.length > 0 ? (
          visibleData.map((item) => (
            <div key={item._id} style={quickTipInstanceStyle}>
              <div style={textStyle}>{item.quote}</div>
              <div style={{ ...textStyle, alignItems: "right" }}>
                {item.author}
              </div>
              <button
                style={{ ...buttonStyle, color: "#401C0C" }}
                onClick={() => handleRemoveNotification(item._id)}
              >
                지우기
              </button>
            </div>
          ))
        ) : (
          <div style={{ ...quickTipInstanceStyle, alignItems: "center" }}>
            <p style={centeredTextStyle}>득근하세요</p>
          </div>
        )}
      </div>

      <button style={closeButtonStyle} onClick={handleClose}>
        Close
      </button>
    </div>
  );
}

NotificationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired, // 업로드 날짜 필드 추가
    })
  ).isRequired,
  accessToken: PropTypes.string.isRequired,
};

export default NotificationModal;
