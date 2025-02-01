import React, { useState } from "react";
import TextInput from "./TextInput"; // ✅ Import TextInput component

interface LeftContainerProps {
  bgColor: string;
  showEditor: boolean;
  setShowEditor: (show: boolean) => void;
}

const LeftContainer: React.FC<LeftContainerProps> = ({ bgColor, showEditor, setShowEditor }) => {
  const [content, setContent] = useState("");

  return (
    <div
      className={`flex-1 border-4 border-black flex justify-center items-center ${bgColor} p-5 relative overflow-visible`} // ✅ Fix overflow
    >
      {showEditor ? (
        <TextInput
          content={content}
          setContent={setContent}
          onDelete={() => setShowEditor(false)}
        />
      ) : (
        <span className="text-lg font-semibold text-gray-800"></span>
      )}
    </div>
  );
};

export default LeftContainer;
