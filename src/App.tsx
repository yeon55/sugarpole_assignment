import React, { useState } from "react";
import "../public/index.css";

const App = () => {
  const [zoomFactor, setZoomFactor] = useState(1); // 초기 줌 배율은 1로 설정
  const [zoomed, setZoomed] = useState(false); // 확대 여부 상태
  const [flipped, setFlipped] = useState(false); // 좌우 반전 여부 상태
  const [flippedVertical, setFlippedVertical] = useState(false); // 상하 반전 여부 상태

  // Zoom 기능
  function handleZoom(): void {
    if (!zoomed) {
      setZoomFactor((prevZoomFactor) => prevZoomFactor + 0.05); // 5%씩 확대
      setZoomed(true); // 확대 상태 업데이트
    }
  }

  // 좌우 반전 기능
  function handleFlipH(): void {
    setFlipped(!flipped); // 좌우 반전 상태를 토글
  }

  // 상하 반전 기능
  function handleFlipV(): void {
    setFlippedVertical(!flippedVertical); // 상하 반전 상태를 토글
  }

  function handleRotate(): void {
    //
  }
  function handleInvert(): void {
    //
  }
  function handleColormap(): void {
    //
  }
  function handleReset(): void {
    //
  }
  function handlePreviousImage(): void {
    //
  }
  function handleNextImage(): void {
    //
  }

  return (
    <>
      {/* header 부분 */}
      <header className="min-w-max h-116 p-5 flex justify-center items-center relative z-10">
        <div className=" text-xs flex items-center">
          <div className="mr-4">Dicom Viewer(with Cornerstone.js)</div>
          <ul className="inline-flex space-x-4 mx-4">
            <li onClick={handleZoom}>Zoom</li>
            <li onClick={handleFlipH}>Flip H</li>
            <li onClick={handleFlipV}>Flip V</li>
            <li onClick={handleRotate}>Rotate Delta 30</li>
            <li onClick={handleInvert}>Invert</li>
            <li onClick={handleColormap}>Apply Colormap</li>
            <li onClick={handleReset}>Reset</li>
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
        <div className="relative w-full">
          <img
            className="absolute w-full"
            style={{
              transform: `scaleX(${flipped ? -1 : 1}) scaleY(${
                flippedVertical ? -1 : 1
              }) scale(${zoomFactor})`, // 좌우 및 상하 반전 및 확대 적용
            }}
            src="/image/img0.png"
            alt="img_main"
          />
        </div>
      </main>
    </>
  );
};

export default App;
