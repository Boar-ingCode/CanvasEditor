import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox, ResizeCallbackData, ResizeHandle } from "react-resizable";
import Move from "../assets/move.png";
import Delete from "../assets/delete.svg";

interface ImageInputProps {
  imageSrc: string | null;
  setImageSrc: (image: string | null) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ imageSrc, setImageSrc }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isFocused, setIsFocused] = useState(true); 
  const [resizeHandles, setResizeHandles] = useState<ResizeHandle[]>(["se"]);
  const [imageSize, setImageSize] = useState({ width: 150, height: 150 });
  const draggableRef = useRef<HTMLDivElement | null>(null);

  //  Hide buttons when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (draggableRef.current && !draggableRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!imageSrc) return null; 

  return (
    <Draggable disabled={isResizing} bounds="parent" nodeRef={draggableRef} handle=".move-icon">
      <div ref={draggableRef} className="absolute" onClick={() => setIsFocused(true)}>
        <ResizableBox
          width={imageSize.width}
          height={imageSize.height}
          minConstraints={[50, 50]}
          maxConstraints={[600, 600]}
          axis="both"
          resizeHandles={resizeHandles} 
          onResizeStop={(_e, data: ResizeCallbackData) => {
            setIsResizing(false);
            setImageSize({ width: data.size.width, height: data.size.height });
          }}
          className={`relative transition ${isFocused ? "border-2 border-purple-500" : "border-none"}`}
        >
          <div className="relative w-full h-full">
            {/*  Move Icon (Left-Side) - Only Show When Focused */}
            {isFocused && (
              <div className="absolute top-[-10px] left-[-10px] w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-move move-icon">
                <img src={Move} alt="Move" className="w-8 h-8 pointer-events-none select-none" draggable="false" />
              </div>
            )}

            {/*  Uploaded Image */}
            <img src={imageSrc} alt="Uploaded" className="w-full h-full object-cover" />

            {/*  Delete Button (Top-Right) - Only Show When Focused */}
            {isFocused && (
              <button
                className="absolute top-[-10px] right-[-10px] bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-red-400"
                onClick={() => setImageSrc(null)}
              >
                <img src={Delete} alt="Delete" className="w-6 h-6 pointer-events-none select-none" draggable="false" />
              </button>
            )}

            {/*  Resize Button (Bottom-Left) with Tooltip */}
            {isFocused && (
              <div className="absolute bottom-[-10px] right-[-10px]">
                <div className="relative group">
                  <button
                    onMouseDown={() => setResizeHandles(["se"])}
                    className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition hover:bg-purple-400 cursor-sw-resize relative"
                  >
                    <div className="absolute w-3 h-3 bg-purple-600 rounded-full"></div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default ImageInput;
