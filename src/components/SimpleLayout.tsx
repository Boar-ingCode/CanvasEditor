import React, { useState, useRef } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

const SimpleLayout: React.FC = () => {
  const [leftBgColor, setLeftBgColor] = useState("#93C5FD");
  const [showEditor, setShowEditor] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [resetBg, setResetBg] = useState(false); 
  const [content, setContent] = useState(""); 
  const leftContainerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    console.log("🔴 Resetting background...");
    setImageSrc(null);
    setBgImage(null);
    setLeftBgColor("#93C5FD"); 
    setShowEditor(false);
    setResetBg(true); 
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[70%] h-[90vh]  flex gap-5 p-5">
        <LeftContainer
          ref={leftContainerRef}
          bgColor={leftBgColor}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          bgImage={bgImage}
          setBgImage={setBgImage} 
          resetBg={resetBg}
          setResetBg={setResetBg} 
          content={content}
          setContent={setContent}
        />
        <RightContainer
          showEditor={showEditor}
          imageSrc={imageSrc}
          bgImage={bgImage} 
          setLeftBgColor={setLeftBgColor}
          setShowEditor={setShowEditor}
          setImageSrc={setImageSrc}
          setBgImage={setBgImage}
          setResetBg={setResetBg}
          leftContainerRef={leftContainerRef}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default SimpleLayout;
