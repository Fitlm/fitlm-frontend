import React, { useEffect, useState } from "react";
import CustomCalendar from "./component/Calendar";
import FitlmPhoto from "./component/FitlmPhoto";
import axiosInstance from "../../utils/axios";

const CalendarPage = () => {
  const limit = 4;
  const [exerciseData, setExerciseData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exerciseInfo, setExerciseInfo] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [skip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await fetchAuthenticatedUser();
        await fetchExerciseData({ userId, skip, limit });
      } catch (error) {
        console.error(
          "Failed to fetch authenticated user or exercise data",
          error
        );
      }
    };

    fetchData();
  }, [skip]);

  const fetchExerciseData = async ({
    userId,
    skip,
    limit,
    loadMore = false,
  }) => {
    const params = {
      skip,
      limit,
      userId, // userId를 포함하여 요청
    };

    try {
      const response = await axiosInstance.get("/products", { params });
      console.log("Fetched exercise data:", response.data);

      const products = response.data.products;

      const newExerciseData = products.reduce((acc, item) => {
        if (item.date) {
          const dateParts = item.date
            .split(". ")
            .map((part) => parseInt(part, 10));
          const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
          date.setHours(date.getHours() + 9); // 한국 시간 기준으로 변환
          const formattedDate = date.toISOString().split("T")[0];

          acc[formattedDate] = {
            image: item.imageName || null,
            time: `${item.time}min`,
            type: item.part,
            motivation: item.memo,
            count: 7,
            date: item.date, // 서버에서 받아온 product의 date 값
            emotion: item.satisfactionId,
            color: item.color,
            flip: item.flip, // flip 값을 추가
          };
        }
        return acc;
      }, {});

      if (loadMore) {
        setExerciseData((prevData) => ({ ...prevData, ...newExerciseData }));
      } else {
        setExerciseData(newExerciseData);
      }
    } catch (error) {
      console.error("Error fetching exercise data:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsFlipped(false); // 날짜 변경 시 isFlipped 상태 초기화
  };

  useEffect(() => {
    const date = new Date(selectedDate);
    date.setHours(date.getHours() + 9); // 한국 시간 기준으로 변환
    const formattedDate = date.toISOString().split("T")[0];
    const selectedExerciseInfo = exerciseData[formattedDate] || {
      date: formattedDate,
      count: 0,
    };
    setExerciseInfo(selectedExerciseInfo);
  }, [selectedDate, exerciseData]);

  const handleImageRemoved = () => {
    const date = new Date(selectedDate);
    date.setHours(date.getHours() + 9); // 한국 시간 기준으로 변환
    const formattedDate = date.toISOString().split("T")[0];

    const updatedExerciseData = { ...exerciseData };
    delete updatedExerciseData[formattedDate];

    setExerciseData(updatedExerciseData);

    const selectedExerciseInfo = updatedExerciseData[formattedDate] || {
      date: formattedDate,
      count: 0,
    };
    setExerciseInfo(selectedExerciseInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center mr-40">
      <div className="flex flex-row items-center justify-start space-x-8">
        <FitlmPhoto
          exerciseInfo={exerciseInfo}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          onImageRemoved={handleImageRemoved}
        />
        <div className="w-6px"></div>
        <CustomCalendar
          onDateChange={handleDateChange}
          exerciseData={exerciseData}
        />
      </div>
    </div>
  );
};

export default CalendarPage;

// fetchAuthenticatedUser 함수 추가
async function fetchAuthenticatedUser() {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axiosInstance.get("/users/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error("User data is not available");
    }

    return response.data.userId;
  } catch (error) {
    console.error("Failed to fetch authenticated user:", error);
    throw error;
  }
}
