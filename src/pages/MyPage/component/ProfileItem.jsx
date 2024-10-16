import React from "react";

const ProfileItem = ({ label, value, isEditing, onChange, unit }) => {
  const inputBoxColor = "#FCF5F3";

  return (
    <div className="w-[48%] border-2 border-[#E2D7D2] rounded-2xl overflow-hidden">
      <div className="bg-[#FCF5F3] p-4 h-16 flex items-center">
        <p className="text-[#401C0C] font-bold w-1/4">{label}</p>
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
