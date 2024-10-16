import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";

const emojiMap = {
  emoji1: "/images/emoji/emoji1.svg",
  emoji2: "/images/emoji/emoji2.svg",
  emoji3: "/images/emoji/emoji3.svg",
  emoji4: "/images/emoji/emoji4.svg",
  emoji5: "/images/emoji/emoji5.svg",
  emoji6: "/images/emoji/emoji6.svg",
  emoji7: "/images/emoji/emoji7.svg",
};

const CustomCalendar = ({ onDateChange, exerciseData }) => {
  const [value, onChange] = useState(new Date());

  const handleChange = (date) => {
    onChange(date);
    onDateChange(date);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      const exerciseInfo = exerciseData[formattedDate];

      if (exerciseInfo && exerciseInfo.emotion) {
        const emojiSrc = emojiMap[exerciseInfo.emotion];
        return (
          <div className="calendar-emoji-container">
            <img
              src={emojiSrc}
              alt={`Emotion ${exerciseInfo.emotion}`}
              className="calendar-emoji"
            />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center">
      <Calendar
        onChange={handleChange}
        value={value}
        locale="en-US"
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: "short" }).substring(0, 3)
        }
        next2Label={null}
        prev2Label={null}
        tileContent={tileContent}
      />
    </div>
  );
};

export default CustomCalendar;
