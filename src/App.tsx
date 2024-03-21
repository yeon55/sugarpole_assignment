import React, { useState } from "react";
import "../public/index.css";

interface Image {
  id: number;
  zoomFactor: number;
  zoomed: boolean;
  flipped: boolean;
  flippedVertically: boolean;
  rotationAngle: number;
  src: string;
  inverted: boolean;
  data: number[][];
}

const App = () => {
  const [images, setImages] = useState<Image[]>([
    {
      id: 0,
      zoomFactor: 1,
      zoomed: false,
      flipped: false,
      flippedVertically: false,
      rotationAngle: 0,
      src: "/image/img0.png",
      inverted: false,
      data: [],
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
      data: [],
    },
    {
      id: 2,
      zoomFactor: 1,
      zoomed: false,
      flipped: false,
      flippedVertically: false,
      rotationAngle: 0,
      src: "/image/img2.png",
      inverted: false,
      data: [],
    },
    {
      id: 3,
      zoomFactor: 1,
      zoomed: false,
      flipped: false,
      flippedVertically: false,
      rotationAngle: 0,
      src: "/image/img3.png",
      inverted: false,
      data: [],
    },
    {
      id: 4,
      zoomFactor: 1,
      zoomed: false,
      flipped: false,
      flippedVertically: false,
      rotationAngle: 0,
      src: "/image/img4.png",
      inverted: false,
      data: [],
    },
    {
      id: 5,
      zoomFactor: 1,
      zoomed: false,
      flipped: false,
      flippedVertically: false,
      rotationAngle: 0,
      src: "/image/img5.png",
      inverted: false,
      data: [],
    },
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // 현재 보여지는 이미지의 인덱스
  const [clickedImageId, setClickedImageId] = useState<number | null>(null); // 클릭된 이미지의 ID 추적

  // 색상 맵을 정의
  const colorMap = [
    { value: 0, color: [255, 255, 255] }, // 픽셀 값이 0인 경우 흰색으로 변환
    { value: 255, color: [255, 0, 0] }, // 픽셀 값이 255인 경우 빨간색으로 변환
  ];

  function applyColorMap(pixelValue: number) {
    for (let i = 0; i < colorMap.length; i++) {
      if (pixelValue <= colorMap[i].value) {
        return colorMap[i].color;
      }
    }
    return [0, 0, 0];
  }

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
      data?: any;
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
      if (clickedImageId !== null) {
        const updatedImages = images.map((image) => {
          if (image.id === clickedImageId) {
            const updatedImageData = image.data.map((pixelValue: any) => {
              const color = applyColorMap(pixelValue);
              return [...color, 255];
            });
            return { ...image, data: updatedImageData };
          } else {
            return image;
          }
        });

        setImages(updatedImages);
      }
    },

    handleReset: () => {
      setImages(
        images.map((image) => ({
          ...image,
          zoomFactor: 1,
          zoomed: false,
          flipped: false,
          flippedVertically: false,
          rotationAngle: 0,
          inverted: false,
        }))
      );
    },
  });

  // Previous Image 기능
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  // Next Image 기능
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  return (
    <>
      {/* header 부분 */}
      <header className="min-w-max h-116 p-5 flex justify-center items-center relative z-10">
        <div className=" text-xs flex items-center">
          <div className="mr-4">Dicom Viewer(with Cornerstone.js)</div>
          <ul className="inline-flex space-x-4 mx-4">
            <li
              onClick={() =>
                handleImageClick(images[currentImageIndex].id).handleZoom()
              }
            >
              Zoom
            </li>
            <li
              onClick={() =>
                handleImageClick(images[currentImageIndex].id).handleFlipH()
              }
            >
              Flip H
            </li>
            <li
              onClick={() =>
                handleImageClick(images[currentImageIndex].id).handleFlipV()
              }
            >
              Flip V
            </li>
            <li
              onClick={() =>
                handleImageClick(images[currentImageIndex].id).handleRotate()
              }
            >
              Rotate Delta 30
            </li>
            <li
              onClick={() =>
                handleImageClick(images[currentImageIndex].id).handleInvert()
              }
            >
              Invert
            </li>
            <li
              onClick={() =>
                handleImageClick(images[currentImageIndex].id).handleColormap()
              }
            >
              Apply Colormap
            </li>
            <li
              onClick={() =>
                handleImageClick(images[currentImageIndex].id).handleReset()
              }
            >
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
        <div className="gap-10 relative flex justify-between items-center">
          {images
            .filter(
              (image) =>
                image.id === currentImageIndex ||
                image.id === currentImageIndex + 1
            )
            .map((image) => (
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
                  const imageClickHandler = handleImageClick(image.id);
                  setClickedImageId(image.id);
                }}
              />
            ))}
        </div>
      </main>
    </>
  );
};

export default App;
