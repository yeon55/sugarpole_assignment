import React, { useState } from "react";
import "../public/index.css";

const App = () => {
  const [zoomFactor, setZoomFactor] = useState(1); // 초기 줌 배율은 1로 설정
  const headerHeight = 116;

  function handleZoom(): void {
    setZoomFactor((prevZoomFactor) => prevZoomFactor + 0.1); // 10%씩 확대
  }

  function handleFlipH(): void {
    //
  }

  function handleFlipV(): void {
    //
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

  const mainStyle = {
    height: `calc(100vh - ${headerHeight}px)`, // 헤더 높이만큼 뺀 나머지 공간을 main 영역의 높이로 설정
  };

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
      <main className="relative z-0" style={mainStyle}>
        <div className="w-full">
          <img
            className="w-full"
            style={{ transform: `scale(${zoomFactor})` }}
            src="/image/img0.png"
            alt="img_main"
          />
        </div>
      </main>
    </>
  );
};

export default App;
