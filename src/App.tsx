import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // 이미지 데이터 불러오는 비동기 함수
    const loadImageData = async () => {
      const updatedImages = await Promise.all(
        images.map(async (image) => {
          const response = await fetch(image.src); // 이미지 경로에 대한 요청
          const blob = await response.blob();
          const arrayBuffer = await new Response(blob).arrayBuffer();
          const data = new Uint8Array(arrayBuffer); // 이미지 데이터 배열

          // 데이터를 2차원 배열로 변환 (예시)
          const imageData: number[][] = [];
          for (let i = 0; i < data.length; i++) {
            imageData.push([data[i]]); // 예시로 단일 픽셀로 처리
          }

          return { ...image, data: imageData };
        })
      );

      setImages(updatedImages);
    };

    loadImageData();
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

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
      const updatedImages: Image[] = images
        .map((image) => {
          if (image.id === id && image.data.length > 0) {
            const updatedImageData = image.data.map((row) =>
              row.map((pixelValue) => {
                const color = applyColorMap(pixelValue);
                return [...color, 255];
              })
            );
            return { ...image, data: updatedImageData };
          } else {
            return image;
          }
        })
        .filter((image): image is Image => image !== undefined); // 타입 가드 추가하여 undefined 제거하기

      setImages(updatedImages);
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
    setClickedImageId(null); // Previous Image를 클릭할 때 클릭된 이미지 ID 초기화
  };

  // Next Image 기능
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
    );
    setClickedImageId(null); // Next Image를 클릭할 때 클릭된 이미지 ID 초기화
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
