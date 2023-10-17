import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [images, setImages] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imagePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onload = (event) => {
          resolve(event.target.result);
        };
      });
    });

    Promise.all(imagePreviews).then((previews) => {
      setImages(previews);
    });
  };

  const handleDeleteImage = (index) => {
    console.log("deleteImage");
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div>
            {images &&
              images.map((image, index) => (
                <div style={{ flexDirection: "column" }}>
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index}`}
                    style={{ width: 130, height: 130 }}
                  />
                  <button onClick={() => handleDeleteImage(index)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
