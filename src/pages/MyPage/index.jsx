import React, { useState, useEffect } from "react";
import { logoutUser } from "../../store/thunkFunctions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileItem from "./component/ProfileItem";
import axiosInstance from "../../utils/axios";

const MyPage = () => {
  // 상태 변수 선언
  const [userId, setName] = useState("Fitlm");
  const [nickname, setNickname] = useState("핏-름");
  const [height, setHeight] = useState("178.5");
  const [weight, setWeight] = useState("73.5");
  const [muscleMass, setMuscle] = useState("34.2");
  const [bodyFatPercentage, setFat] = useState("19.2");

  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태 변수

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보 가져오기
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");
        const user = response.data;
        setName(user.name);
        setNickname(user.userNickname);
        setHeight(user.profile.height);
        setWeight(user.profile.weight);
        setMuscle(user.profile.muscleMass);
        setFat(user.profile.bodyFatPercentage);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = async () => {
    if (isEditing) {
      // 사용자 정보 업데이트
      try {
        const updatedProfile = {
          name: userId,
          userNickname: nickname,
          profile: {
            height,
            weight,
            muscleMass,
            bodyFatPercentage,
          },
        };
        await axiosInstance.put("/users/profile", updatedProfile);
      } catch (error) {
        console.error("Failed to update user profile", error);
      }
    }
    setIsEditing(!isEditing); // 편집 모드 토글
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-dark-color">
      <section className="flex flex-col items-center justify-center w-4/5 rounded-lg h-2/3 bg-light-color">
        <div className="w-full max-w-6xl p-10">
          {/* 사용자 프로필 섹션 */}
          <div className="flex flex-col items-center p-6">
            <div className="flex items-center justify-center">
              {/* 프로필 이미지 */}
              <img
                src="images/FITLM.jpg"
                alt=""
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              />
              <div className="flex flex-col text-left" style={{ minWidth: "200px" }}>
                {isEditing ? (
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="mb-1 text-xl font-bold text-dark-color"
                    style={{
                      backgroundColor: "transparent",
                      color: "#B09C93",
                      border: "none",
                      height: "2rem",
                      textAlign: "left",
                      width: "180px", // 입력 필드의 최대 너비 설정
                    }}
                  />
                ) : (
                  <p className="mb-1 text-xl font-bold text-dark-color" style={{ width: "180px" }}>{nickname}</p>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setName(e.target.value)}
                    className="text-sm text-dark-color"
                    style={{
                      backgroundColor: "transparent",
                      color: "#B09C93",
                      border: "none",
                      height: "1.5rem",
                      textAlign: "left",
                      width: "180px", // 입력 필드의 최대 너비 설정
                    }}
                  />
                ) : (
                  <p className="pt-1 text-sm text-dark-color" style={{ width: "180px" }}>{userId}</p>
                )}
              </div>
            </div>
          </div>

          {/* 사용자 프로필 상세 정보 섹션 */}
          <div className="flex mt-4 justify-evenly">
            <ProfileItem
              label="키"
              value={height}
              isEditing={isEditing}
              onChange={(e) => setHeight(e.target.value)}
              unit="cm"
            />
            <ProfileItem
              label="몸무게"
              value={weight}
              isEditing={isEditing}
              onChange={(e) => setWeight(e.target.value)}
              unit="kg"
            />
          </div>

          <div className="flex mt-5 justify-evenly">
            <ProfileItem
              label="골격근량"
              value={muscleMass}
              isEditing={isEditing}
              onChange={(e) => setMuscle(e.target.value)}
              unit="kg"
            />
            <ProfileItem
              label="체지방률"
              value={bodyFatPercentage}
              isEditing={isEditing}
              onChange={(e) => setFat(e.target.value)}
              unit="%"
            />
          </div>

          {/* 편집 모드 버튼 */}
          <div className="flex justify-center mt-20">
            <button
              className="px-6 py-2 bg-[#FCF5F3] rounded-3xl text-dark-color"
              style={{ width: "100px" }}
              onClick={handleEdit}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </section>

      {/* 로그아웃 버튼 */}
      <button
        className="block w-full mt-3 underline hover:text-white text-dark-color"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default MyPage;
