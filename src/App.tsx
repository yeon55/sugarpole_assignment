import React, { useState } from "react";
import "../public/index.css";

const App = () => {
  const [images, setImages] = useState([
    {
      id: 0,
      zoomFactor: 1,
      zoomed: false,
      flipped: false,
      flippedVertically: false,
      rotationAngle: 0,
      src: "/image/img0.png",
    },
    {
      id: 1,
      zoomFactor: 1,
      zoomed: false,
      flipped: false,
      flippedVertically: false,
      rotationAngle: 0,
      src: "/image/img1.png",
    },
  ]);

  // 이미지 상태 업데이트 함수
  const updateImageState = (
    id: number,
    newState: {
      zoomFactor?: number;
      zoomed?: boolean;
      flipped?: boolean;
      flippedVertically?: boolean;
      rotationAngle?: number;
    }
  ) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, ...newState } : img))
    );
  };

  // Zoom 기능
  const handleZoom = (id: number) => {
    updateImageState(id, {
      zoomFactor: images[id].zoomed
        ? images[id].zoomFactor
        : images[id].zoomFactor + 0.05,
      zoomed: true,
    });
  };

  // 좌우 반전 기능
  const handleFlipH = (id: number) => {
    updateImageState(id, { flipped: !images[id].flipped });
  };

  // 상하 반전 기능
  const handleFlipV = (id: number) => {
    updateImageState(id, { flippedVertically: !images[id].flippedVertically });
  };

  // 각도 조절 기능
  const handleRotate = (id: number) => {
    updateImageState(id, { rotationAngle: images[id].rotationAngle + 30 });
  };

  // Invert 기능
  const handleInvert = (id: number) => {
    // Handle Invert
  };

  // Colormap 적용 기능
  const handleColormap = (id: number) => {
    // Handle Colormap
  };

  // Reset 기능
  const handleReset = (id: number) => {
    // Handle Reset
  };

  // Previous Image 기능
  const handlePreviousImage = () => {
    // Handle Previous Image
  };

  // Next Image 기능
  const handleNextImage = () => {
    // Handle Next Image
  };

  return (
    <>
      {/* header 부분 */}
      <header className="min-w-max h-116 p-5 flex justify-center items-center relative z-10">
        <div className=" text-xs flex items-center">
          <div className="mr-4">Dicom Viewer(with Cornerstone.js)</div>
          <ul className="inline-flex space-x-4 mx-4">
            <li onClick={() => handleZoom(0)}>Zoom</li>
            <li onClick={() => handleFlipH(0)}>Flip H</li>
            <li onClick={() => handleFlipV(0)}>Flip V</li>
            <li onClick={() => handleRotate(0)}>Rotate Delta 30</li>
            <li onClick={() => handleInvert(0)}>Invert</li>
            <li onClick={() => handleColormap(0)}>Apply Colormap</li>
            <li onClick={() => handleReset(0)}>Reset</li>
          </ul>
          <div className="ml-auto space-x-2">
            <button
              className="w-32 p-2.5 bg-button text-white"
              onClick={handlePreviousImage}
            >
              Previous Image
            </button>
            <button
              className="w-32 p-2.5 bg-button text-white"
              onClick={handleNextImage}
            >
              Next Image
            </button>
          </div>
        </div>
      </header>

      {/* main 부분 */}
      <main className="p-20 z-0 flex justify-center">
        <div className="relative w-full flex justify-between items-center">
          {images.map((image) => (
            <img
              key={image.id}
              className="w-50%"
              style={{
                transform: `rotate(${image.rotationAngle}deg) scaleX(${
                  image.flipped ? -1 : 1
                }) scaleY(${image.flippedVertically ? -1 : 1}) scale(${
                  image.zoomFactor
                })`,
              }}
              src={image.src}
              alt={`img_${image.id}`}
              onClick={() => handleZoom(image.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default App;
