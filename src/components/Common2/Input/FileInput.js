import React, { useState } from "react";
import "./style.css";

function FileInput({ accept, id, fileHandleFnc, text }) {
  const [fileSelected, setFileSelected] = useState("");

  const onChange = (e) => {
    
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`label-input ${!fileSelected ? "" : "active"}`}
      >
        {fileSelected ? `The File ${fileSelected} was Selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
}

export default FileInput;