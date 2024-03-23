import React, { useState } from "react";
import "../public/index.css";

interface Image {
  [x: string]: any;
  id: number;
  zoomFactor: number;
  zoomed: boolean;
  flipped: boolean;
  flippedVertically: boolean;
  rotationAngle: number;
  src: string;
  originalSrc: string; // 추가: 원본 이미지 URL 저장
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
      originalSrc: "/image/img0.png", // 추가: 원본 이미지 URL 저장
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
      originalSrc: "/image/img1.png",
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
      originalSrc: "/image/img2.png",
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
      originalSrc: "/image/img3.png",
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
      originalSrc: "/image/img4.png",
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
      originalSrc: "/image/img5.png",
      inverted: false,
      data: [],
    },
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // 현재 보여지는 이미지의 인덱스
  const [clickedImageId, setClickedImageId] = useState<number | null>(null); // 클릭된 이미지의 ID 추적

  // 색상 맵 정의
  const colorMap = [
    { value: 0, color: [255, 255, 255] },
    { value: 255, color: [255, 0, 0] },
  ];

  // 이미지 상태 업데이트 함수
  const updateImageState = (id: number, newState: Partial<Image>) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, ...newState } : img))
    );
  };

  const getColorForPixel = (pixelValue: number) => {
    const colorMap = [
      { value: 0, color: [255, 0, 0] },
      { value: 255, color: [255, 255, 255] },
    ];

    for (let i = 0; i < colorMap.length - 1; i++) {
      if (
        pixelValue >= colorMap[i].value &&
        pixelValue < colorMap[i + 1].value
      ) {
        return colorMap[i].color;
      }
    }
    return [0, 0, 0];
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
      if (id !== null) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (context) {
          const imageElement = new Image();
          imageElement.src = images[id].src;

          imageElement.onload = () => {
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;

            context.drawImage(
              imageElement,
              0,
              0,
              imageElement.width,
              imageElement.height
            );

            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              const pixelValue = data[i];
              const mappedColor = getColorForPixel(pixelValue);
              data[i] = mappedColor[0];
              data[i + 1] = mappedColor[1];
              data[i + 2] = mappedColor[2];
            }

            context.putImageData(imageData, 0, 0);
            const imgUrl = canvas.toDataURL();

            setImages((prevImages) =>
              prevImages.map((image) => {
                if (image.id === id) {
                  return { ...image, src: imgUrl };
                }
                return image;
              })
            );
          };
        }
      }
    },

    handleReset: () => {
      setImages((prevImages) =>
        prevImages.map((image) => ({
          ...image,
          zoomFactor: 1,
          zoomed: false,
          flipped: false,
          flippedVertically: false,
          rotationAngle: 0,
          inverted: false,
          src: image.originalSrc,
        }))
      );
    },
  });

  // Previous Image 기능
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
    setClickedImageId(null);
  };

  // Next Image 기능
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
    );
    setClickedImageId(null);
  };

  return (
    <>
      {/* header 부분 */}
      <header className="min-w-max h-116 p-5 flex justify-center items-center relative z-10">
        <div className=" text-xs flex items-center">
          <div className="mr-4 cursor-pointer">
            Dicom Viewer(with Cornerstone.js)
          </div>
          <ul className="inline-flex space-x-4 mx-6 ">
            <li
              className="cursor-pointer"
              onClick={() =>
                clickedImageId !== null &&
                handleImageClick(clickedImageId).handleZoom()
              }
            >
              Zoom
            </li>
            <li
              className="cursor-pointer"
              onClick={() =>
                clickedImageId !== null &&
                handleImageClick(clickedImageId).handleFlipH()
              }
            >
              Flip H
            </li>
            <li
              className="cursor-pointer"
              onClick={() =>
                clickedImageId !== null &&
                handleImageClick(clickedImageId).handleFlipV()
              }
            >
              Flip V
            </li>
            <li
              className="cursor-pointer"
              onClick={() =>
                clickedImageId !== null &&
                handleImageClick(clickedImageId).handleRotate()
              }
            >
              Rotate Delta 30
            </li>
            <li
              className="cursor-pointer"
              onClick={() =>
                clickedImageId !== null &&
                handleImageClick(clickedImageId).handleInvert()
              }
            >
              Invert
            </li>
            <li
              className="cursor-pointer"
              onClick={() =>
                clickedImageId !== null &&
                handleImageClick(clickedImageId).handleColormap()
              }
            >
              Apply Colormap
            </li>
            <li
              className="cursor-pointer"
              onClick={() =>
                clickedImageId !== null &&
                handleImageClick(clickedImageId).handleReset()
              }
            >
              Reset
            </li>
          </ul>
          <div className="ml-auto space-x-4">
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
                image.id === currentImageIndex + 2
            )
            .map((image) => (
              <img
                key={image.id}
                className="cursor-pointer"
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
