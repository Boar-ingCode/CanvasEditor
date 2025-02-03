import React, { useState, useRef } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

const SimpleLayout: React.FC = () => {
  const [leftBgColor, setLeftBgColor] = useState("#93C5FD"); // Default: Blue
  const [showEditor, setShowEditor] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [resetBg, setResetBg] = useState(false); // ✅ Add Reset State
  const [content, setContent] = useState(""); // ✅ Store text content
  const leftContainerRef = useRef<HTMLDivElement>(null);


  const handleReset = () => {
    console.log("🔴 Resetting background...");
    setImageSrc(null);
    setBgImage(null);
    setLeftBgColor("#93C5FD"); // ✅ Reset background color
    setShowEditor(false);
    setResetBg(true); // ✅ Ensure LeftContainer resets properly
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[70%] h-[90vh]  flex gap-5 p-5">
        {/* ✅ Pass resetBg to LeftContainer */}
        <LeftContainer
          ref={leftContainerRef}
          bgColor={leftBgColor}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          bgImage={bgImage}
          setBgImage={setBgImage} // ✅ Ensure this is passed
          resetBg={resetBg} // ✅ Pass Reset State
          setResetBg={setResetBg} // ✅ Pass Reset Setter
          content={content}
          setContent={setContent}
        />

        {/* ✅ Pass resetBg to RightContainer */}
        <RightContainer
  setLeftBgColor={setLeftBgColor}
  setShowEditor={setShowEditor}
  setImageSrc={setImageSrc}
  setBgImage={setBgImage}
  setResetBg={setResetBg} // ✅ Pass it here
  leftContainerRef={leftContainerRef}
  handleReset={handleReset} // ✅ Pass handleReset
/>

      </div>
    </div>
  );
};

export default SimpleLayout;
