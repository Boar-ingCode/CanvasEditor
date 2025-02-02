import React, { useState, useRef } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

const SimpleLayout: React.FC = () => {
  const [leftBgColor, setLeftBgColor] = useState("bg-blue-200");
  const [showEditor, setShowEditor] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [resetBg, setResetBg] = useState(false); // ✅ Add Reset State
  const [content, setContent] = useState(""); // ✅ Store text content at the top level
  const leftContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[70%] h-[90vh] border-4 border-black flex gap-5 p-5">
        {/* ✅ Pass setResetBg to LeftContainer */}
        <LeftContainer
          ref={leftContainerRef}
          bgColor={leftBgColor}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          bgImage={bgImage}
          resetBg={resetBg}
          content={content} // ✅ Pass down the content
          setContent={setContent} // ✅ Pass down content updater
        />

        {/* ✅ Pass setResetBg to RightContainer */}
        <RightContainer
          setLeftBgColor={setLeftBgColor}
          setShowEditor={setShowEditor}
          setImageSrc={setImageSrc}
          setBgImage={setBgImage}
          leftContainerRef={leftContainerRef}
          setResetBg={setResetBg} // ✅ Pass setResetBg Here!
        />
      </div>
    </div>
  );
};

export default SimpleLayout;
