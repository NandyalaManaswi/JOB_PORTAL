import React from "react";
import { useRef, useState } from "react";
import "./FileUpload.css";

function FileUpload() {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };


  return (
    
    <div className="image-upload-container">
      <div className="box-decoration">
        <label htmlFor="image-upload-input" className="image-upload-label">
          {image ? image.name : "Choose a Logo"}
        </label>
        <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="upload" className="img-display-after" />
          ) : (
              <h3>Upload</h3>
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={inputRef}
            style={{ display: "none" }}
          />
        </div>

      </div>
    </div>
  );
}

export default FileUpload;