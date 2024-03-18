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
      inverted: false,
    },
    {
      id: 1,
      zoomFactor: 1,
      zoomed: false,
      flipped: false,
      flippedVertically: false,
      rotationAngle: 0,
      src: "/image/img1.png",
      inverted: false,
    },
  ]);

  const [clickedImageId, setClickedImageId] = useState(Number); // 클릭된 이미지의 ID 추적

  // 이미지 상태 업데이트 함수
  const updateImageState = (
    id: number,
    newState: {
      zoomFactor?: number;
      zoomed?: boolean;
      flipped?: boolean;
      flippedVertically?: boolean;
      rotationAngle?: number;
      inverted?: boolean;
    }
  ) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, ...newState } : img))
    );
  };

  // 이미지 클릭 핸들러
  const handleImageClick = (id: number) => ({
    handleZoom: () =>
      updateImageState(id, {
        zoomFactor: images[id].zoomed
          ? images[id].zoomFactor
          : images[id].zoomFactor + 0.05,
        zoomed: true,
      }),

    handleFlipH: () => updateImageState(id, { flipped: !images[id].flipped }),

    handleFlipV: () =>
      updateImageState(id, {
        flippedVertically: !images[id].flippedVertically,
      }),

    handleRotate: () =>
      updateImageState(id, { rotationAngle: images[id].rotationAngle + 30 }),

    handleInvert: () => {
      updateImageState(id, { inverted: !images[id].inverted });
    },

    handleColormap: () => {
      //
    },

    handleReset: () => {
      //
    },
  });

  // Previous Image 기능
  const handlePreviousImage = () => {
    //
  };

  // Next Image 기능
  const handleNextImage = () => {
    //
  };

  return (
    <>
      {/* header 부분 */}
      <header className="min-w-max h-116 p-5 flex justify-center items-center relative z-10">
        <div className=" text-xs flex items-center">
          <div className="mr-4">Dicom Viewer(with Cornerstone.js)</div>
          <ul className="inline-flex space-x-4 mx-4">
            <li onClick={handleImageClick(clickedImageId).handleZoom}>Zoom</li>
            <li onClick={handleImageClick(clickedImageId).handleFlipH}>
              Flip H
            </li>
            <li onClick={handleImageClick(clickedImageId).handleFlipV}>
              Flip V
            </li>
            <li onClick={handleImageClick(clickedImageId).handleRotate}>
              Rotate Delta 30
            </li>
            <li onClick={handleImageClick(clickedImageId).handleInvert}>
              Invert
            </li>
            <li onClick={handleImageClick(clickedImageId).handleColormap}>
              Apply Colormap
            </li>
            <li onClick={handleImageClick(clickedImageId).handleReset}>
              Reset
            </li>
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
                filter: image.inverted ? "invert(100%)" : "none",
              }}
              src={image.src}
              alt={`img_${image.id}`}
              onClick={() => {
                const imageClickHandler = handleImageClick(image.id); // 클릭된 이미지의 id 전달
                setClickedImageId(image.id);
                console.log("image : ", image.id);
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default App;
