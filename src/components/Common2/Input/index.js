import React from "react";
import "./style.css"

const InputComponent = ({type, state, setState, placeholder, required}) => {
  return (
    <div className="container" >
      <input 
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="custom-input"
      />
    </div>
  );
};

export default InputComponent;
