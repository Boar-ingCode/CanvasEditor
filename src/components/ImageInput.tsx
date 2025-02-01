import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox, ResizeCallbackData, ResizeHandle } from "react-resizable";

interface ImageInputProps {
  imageSrc: string | null;
  setImageSrc: (image: string | null) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ imageSrc, setImageSrc }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandles, setResizeHandles] = useState<ResizeHandle[]>([]);
  const [imageSize, setImageSize] = useState({ width: 150, height: 150 });
  const draggableRef = useRef(null);

  // ✅ Enable resizing only while holding `Alt`
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.altKey) {
      setResizeHandles(["se", "sw", "ne", "nw", "e", "w", "n", "s"]); // Enable all resize directions
      setIsResizing(true);
    }
  };

  const handleKeyUp = () => {
    setResizeHandles([]); // Disable resizing again
    setIsResizing(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  if (!imageSrc) return null; // ✅ Hide component if no image uploaded

  return (
    <Draggable disabled={isResizing} bounds="parent" nodeRef={draggableRef}>
      <div ref={draggableRef} className="absolute cursor-move">
        <ResizableBox
          width={imageSize.width}
          height={imageSize.height}
          minConstraints={[50, 50]} // ✅ Minimum size
          maxConstraints={[600, 600]} // ✅ Maximum size
          axis="both"
          resizeHandles={resizeHandles}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={(e, data: ResizeCallbackData) => {
            setIsResizing(false);
            setImageSize({ width: data.size.width, height: data.size.height });
          }}
          className="relative"
        >
          <div className="relative w-full h-full">
            <img
              src={imageSrc}
              alt="Uploaded"
              className="w-full h-full object-cover border border-gray-400"
            />
            {/* ❌ Delete Button */}
            <button
              className="absolute top-[-10px] right-[-10px] bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-700"
              onClick={() => setImageSrc(null)} // ✅ Remove image
            >
              ✕
            </button>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default ImageInput;
