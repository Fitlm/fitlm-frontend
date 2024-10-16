// components/InputBox/index.jsx
import React from "react";
import PropTypes from "prop-types";

const InputBox = ({ label, name, type = "text", value, onChange }) => {
  return (
    <div className="mt-4">
      <label htmlFor={name}>{label}</label>
      <input
        className="w-full px-4 py-2 bg-white border rounded-md"
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputBox;
