import React from "react";
import "./style.css";

const Button = ({ text, onClick, disabled }) => {
  return (
    <div onClick={onClick} className="custom-button" disabled={disabled}>
      {text}
    </div>
  );
};

export default Button;
