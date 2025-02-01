import React, { useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

const SimpleLayout: React.FC = () => {
  const [leftBgColor, setLeftBgColor] = useState("bg-blue-200");
  const [showEditor, setShowEditor] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null); // ✅ Store image

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[70%] h-[90vh] border-4 border-black flex gap-5 p-5">
        {/* ✅ Left Container with Draggable & Resizable Text Editor */}
        <LeftContainer
          bgColor={leftBgColor}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          imageSrc={imageSrc} // ✅ Pass image state
          setImageSrc={setImageSrc} // ✅ Pass image setter
        />

        {/* ✅ Right Container with Clickable Icons */}
        <RightContainer 
          setLeftBgColor={setLeftBgColor} 
          setShowEditor={setShowEditor} 
          setImageSrc={setImageSrc} // ✅ Pass setImageSrc to update image
        />
      </div>
    </div>
  );
};

export default SimpleLayout;
