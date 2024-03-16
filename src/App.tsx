import React, { useState } from "react";
import "../public/index.css";

const App = () => {
  const [zoomFactorImg0, setZoomFactorImg0] = useState(1); // 초기 줌 배율은 1로 설정
  const [zoomedImg0, setZoomedImg0] = useState(false); // 확대 여부 상태
  const [flippedImg0, setFlippedImg0] = useState(false); // 좌우 반전 여부 상태
  const [flippedVerticallyImg0, setFlippedVerticallyImg0] = useState(false); // 상하 반전 여부 상태
  const [rotationAngleImg0, setRotationAngleImg0] = useState(0); // 회전 각도 상태

  const [zoomFactorImg1, setZoomFactorImg1] = useState(1);
  const [zoomedImg1, setZoomedImg1] = useState(false);
  const [flippedImg1, setFlippedImg1] = useState(false);
  const [flippedVerticallyImg1, setFlippedVerticallyImg1] = useState(false);
  const [rotationAngleImg1, setRotationAngleImg1] = useState(0);
  // Zoom 기능
  function handleZoomImg0(): void {
    if (!zoomedImg0) {
      setZoomFactorImg0((prevZoomFactor) => prevZoomFactor + 0.05); // 5%씩 확대
      setZoomedImg0(true); // 확대 상태 업데이트
    }
  }

  function handleZoomImg1(): void {
    if (!zoomedImg1) {
      setZoomFactorImg1((prevZoomFactor) => prevZoomFactor + 0.05);
      setZoomedImg1(true);
    }
  }

  // 좌우 반전 기능
  function handleFlipHImg0(): void {
    setFlippedImg0(!flippedImg0); // 좌우 반전 상태를 토글
  }

  function handleFlipHImg1(): void {
    setFlippedImg1(!flippedImg1); // 좌우 반전 상태를 토글
  }

  // 상하 반전 기능
  function handleFlipVImg0(): void {
    setFlippedVerticallyImg0(!flippedVerticallyImg0); // 상하 반전 상태를 토글
  }

  function handleFlipVImg1(): void {
    setFlippedVerticallyImg1(!flippedVerticallyImg1);
  }

  // 각도 조절 기능
  function handleRotateImg0(): void {
    setRotationAngleImg0((prevRotationAngle) => prevRotationAngle + 30); // 현재 회전 각도에 30도를 더하기
  }

  function handleRotateImg1(): void {
    setRotationAngleImg1((prevRotationAngle) => prevRotationAngle + 30);
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
            <li onClick={handleZoomImg0}>Zoom</li>
            <li onClick={handleFlipHImg0}>Flip H</li>
            <li onClick={handleFlipVImg0}>Flip V</li>
            <li onClick={handleRotateImg0}>Rotate Delta 30</li>
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
        <div className="relative w-full flex justify-between items-center">
          <img
            className="w-50%"
            style={{
              transform: `rotate(${rotationAngleImg0}deg) scaleX(${
                flippedImg0 ? -1 : 1
              }) scaleY(${
                flippedVerticallyImg0 ? -1 : 1
              }) scale(${zoomFactorImg0})`, // 회전 및 좌우 및 상하 반전 및 확대 적용
            }}
            src="/image/img0.png"
            alt="img_0"
            onClick={handleZoomImg0}
          />
          <img
            className="w-50%"
            style={{
              transform: `rotate(${rotationAngleImg1}deg) scaleX(${
                flippedImg1 ? -1 : 1
              }) scaleY(${
                flippedVerticallyImg1 ? -1 : 1
              }) scale(${zoomFactorImg1})`,
            }}
            src="/image/img1.png"
            alt="img_1"
            onClick={handleZoomImg1}
          />
        </div>
      </main>
    </>
  );
};

export default App;
