import React, { useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

const SimpleLayout: React.FC = () => {
  const [leftBgColor, setLeftBgColor] = useState("bg-blue-200");
  const [showEditor, setShowEditor] = useState(false);
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[70%] h-[90vh] border-4 border-black flex gap-5 p-5">
        {/* ✅ Left Container with Draggable & Resizable Text Editor */}
        <LeftContainer
          bgColor={leftBgColor}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
        />

        {/* ✅ Right Container with Clickable Icons */}
        <RightContainer setLeftBgColor={setLeftBgColor} setShowEditor={setShowEditor} />
      </div>
    </div>
  );
};

export default SimpleLayout;