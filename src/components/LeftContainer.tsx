import React, { useState } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput"; // ✅ Import new ImageInput component

interface LeftContainerProps {
  bgColor: string;
  showEditor: boolean;
  setShowEditor: (show: boolean) => void;
  imageSrc: string | null;
  setImageSrc: (image: string | null) => void;
}

const LeftContainer: React.FC<LeftContainerProps> = ({
  bgColor,
  showEditor,
  setShowEditor,
  imageSrc,
  setImageSrc
}) => {
  const [content, setContent] = useState("");

  return (
    <div className={`flex-1 border-4 border-black flex justify-center items-center ${bgColor} p-5 relative`}>
      {/* ✅ Show Text Editor */}
      {showEditor && (
        <TextInput content={content} setContent={setContent} onDelete={() => setShowEditor(false)} />
      )}

      {/* ✅ Render ImageInput Component */}
      <ImageInput imageSrc={imageSrc} setImageSrc={setImageSrc} />
    </div>
  );
};

export default LeftContainer;
