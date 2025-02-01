import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import Draggable from "react-draggable";
import { ResizableBox, ResizeCallbackData, ResizeHandle } from "react-resizable";
import "react-quill/dist/quill.snow.css";
import "react-resizable/css/styles.css";
import Move from "../assets/move.png"; 
import Delete from "../assets/delete.svg"; 

interface TextInputProps {
  content: string;
  setContent: (value: string) => void;
  onDelete: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ content, setContent, onDelete }) => {
  const modules = { toolbar: false };

  const [textColor, setTextColor] = useState("black");
  const [fontSize, setFontSize] = useState(16); // Default font size

  // ✅ Handle font size adjustments
  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 40)); // Max 40px
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 10)); // Min 10px

  // ✅ Set min & max constraints
  const minWidth = 150;
  const minHeight = 80;
  const maxWidth = 600;
  const maxHeight = 400;

  // ✅ State to track width, height, and whether resizing is enabled
  const [size, setSize] = useState({ width: 350, height: 120 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandles, setResizeHandles] = useState<ResizeHandle[]>([]);
  const draggableRef = useRef(null);

  // ✅ Detect Shift key press to enable resizing
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.altKey) {
      setResizeHandles(["se", "sw", "ne", "nw", "e", "w", "n", "s"]); // ✅ Enable all resizing directions
      setIsResizing(true);
    }
  };

  const handleKeyUp = () => {
    setResizeHandles([]);
    setIsResizing(false);
  };

  // ✅ Attach key events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const editor = document.querySelector(".ql-editor");
    if (editor) {
      (editor as HTMLElement).style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  return (
    <Draggable disabled={isResizing} bounds="parent" nodeRef={draggableRef} handle=".move-icon">
      <div ref={draggableRef} className="absolute z-50"> 
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={[minWidth, minHeight]}
          maxConstraints={[maxWidth, maxHeight]}
          axis="both"
          resizeHandles={resizeHandles}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={(e, data: ResizeCallbackData) => {
            setIsResizing(false);
            setSize({ width: data.size.width, height: data.size.height });
          }}
          className="relative border-4 border-purple-500 bg-transparent rounded-lg shadow-md flex flex-col"
        >
          <div className="relative w-full h-full flex flex-col">
              {/* ✅ Move Icon (Top-Left) */}
              <div className="absolute top-[-10px] left-[-10px] w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-move move-icon">
              <img
                src={Move}
                alt="Move"
                className="w-5 h-5 pointer-events-none select-none"
                draggable="false"
              />
            </div>

            {/* ✅ Delete Button (Top-Right) */}
            <button
              onClick={onDelete}
              className="absolute top-[-10px] right-[-10px] bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 hover:bg-red-400"
            >
            <img
              src={Delete}
              alt="Delete"
              className="w-4 h-4 pointer-events-none select-none "
              draggable="false"
            />
            </button>

            {/* ✅ Rich Text Editor */}
            <div className="flex-1 overflow-hidden cursor-text">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                className="h-full ql-container-fixed"
                style={{ color: textColor }}
              />
            </div>
          </div>

          <div className="absolute bottom-[-30px] left-0 flex gap-2">
              {["red", "blue", "green", "yellow", "white"].map((color, index) => (
                <button
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-500 hover:opacity-75 transition"
                  style={{ backgroundColor: color }} // ✅ Ensure colors are applied
                  onClick={() => setTextColor(color)} // ✅ Change text color dynamically
                />
              ))}
            </div>

               {/* ✅ Font Size Controls - Below Text Field, Aligned Right */}
            <div className="absolute bottom-[-40px] right-0 flex gap-2">
              <button
                onClick={increaseFontSize}
                className="w-8 h-6 flex items-center justify-center bg-gray-300 rounded-md border border-gray-500 hover:bg-gray-400 transition"
              >
                A+
              </button>
              <button
                onClick={decreaseFontSize}
                className="w-8 h-6 flex items-center justify-center bg-gray-300 rounded-md border border-gray-500 hover:bg-gray-400 transition"
              >
                A-
              </button>
            </div>
        </ResizableBox>
        {/* ✅ Container for Circles - Positioned Below & Left */}
      </div>
    </Draggable>
    
  );
};

export default TextInput;
