import React from "react";

const ProfileItem = ({ label, value, isEditing, onChange, unit }) => {
  const inputBoxColor = "#FCF5F3";

  return (
    <div className="w-[42%] border-3 border-semi-light-color rounded-2xl overflow-hidden">
      <div className="bg-[#FCF5F3] p-4 h-16 flex items-center">
        <p className="text-dark-color font-black w-1/4">{label}</p>
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            style={{
              backgroundColor: inputBoxColor,
              color: "#B09C93",
              border: "none",
            }}
          />
        ) : (
          <p>
            {value}
            {unit}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileItem;
