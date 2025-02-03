import React, { useState, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import Draggable from "react-draggable";
import { ResizableBox, ResizeHandle } from "react-resizable";
import "react-quill/dist/quill.snow.css";
import "react-resizable/css/styles.css";
import Move from "../assets/move.png";
import Delete from "../assets/delete.svg";

// ✅ Register Quill Font Size Styles
const Size = Quill.import("attributors/style/size");
Quill.register(Size, true);

interface TextInputProps {
  content: string;
  setContent: (value: string) => void;
  onDelete: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ content, setContent, onDelete }) => {
  const modules = {
    toolbar: false, // ✅ Keep toolbar hidden, but allow manual formatting
  };

  const textRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<ReactQuill | null>(null);

  const [isFocused, setIsFocused] = useState(true);
  const [textColor, setTextColor] = useState("black");
  const [fontSize, setFontSize] = useState(16);
  const [size, setSize] = useState({ width: 350, height: 120 });
  const [resizeHandles, setResizeHandles] = useState<ResizeHandle[]>([]);

  // ✅ Apply font size dynamically to selected text or future text
  const applyFontSize = (size: number) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();

      if (range && range.length > 0) {
        // ✅ Apply size to selected text
        editor.format("size", `${size}px`);
      } else {
        // ✅ Apply size to future text
        editor.format("size", `${size}px`);
      }
    }
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 40);
    setFontSize(newSize);
    applyFontSize(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 10);
    setFontSize(newSize);
    applyFontSize(newSize);
  };


  // ✅ Prevent image drops inside the editor
  useEffect(() => {
    if (!quillRef.current) return;
    const editor = quillRef.current.getEditor();
    const container = editor.root as HTMLDivElement;

    const handleDrop = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      const hasImageFile = Array.from(e.dataTransfer.files).some((file) =>
        (file as File).type.startsWith("image/")
      );

      if (hasImageFile) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener("drop", handleDrop);
    return () => container.removeEventListener("drop", handleDrop);
  }, []);


  // ✅ Hide borders & buttons when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (textRef.current && !textRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Draggable bounds="parent" nodeRef={textRef} handle=".move-icon">
      <div
        ref={textRef}
        className="absolute z-50 cursor-move"
        onClick={() => setIsFocused(true)}
      >
        <div className="relative">
          <ResizableBox
            width={size.width}
            height={size.height}
            minConstraints={[150, 80]}
            maxConstraints={[600, 400]}
            axis="both"
            resizeHandles={resizeHandles}
            onResizeStop={(e, data) =>
              setSize({ width: data.size.width, height: data.size.height })
            }
            className={`relative bg-transparent flex flex-col transition ${
              isFocused ? "border-4 border-purple-500" : "border-none"
            }`}
          >
            <div className="relative w-full h-full flex flex-col">
              {/* Move Icon (Top-Left) */}
              {isFocused && (
                <div className="absolute top-[-10px] left-[-10px] w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-move move-icon">
                  <img
                    src={Move}
                    alt="Move"
                    className="w-5 h-5 pointer-events-none select-none"
                    draggable="false"
                  />
                </div>
              )}

              {/* Delete Button (Top-Right) */}
              {isFocused && (
                <button
                  onClick={onDelete}
                  className="absolute top-[-10px] right-[-10px] bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition hover:bg-red-400"
                >
                  <img
                    src={Delete}
                    alt="Delete"
                    className="w-4 h-4 pointer-events-none select-none"
                    draggable="false"
                  />
                </button>
              )}

              {/* Resize Button (Bottom-Right) with Tooltip */}
                {isFocused && (
                  <div className="absolute bottom-[-10px] right-[-10px]">
                    <div className="relative group">
                      <button
                        onClick={onDelete}
                        className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition hover:bg-purple-400"
                      >
                      </button>

                      {/* Tooltip - Shows on Hover */}
                      <div className="absolute bottom-8 right-0 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        To resize image/text, hold Alt button
                      </div>
                    </div>
                  </div>
                )}


                {/* Resize Button (Bottom-Right) with Tooltip */}
                {isFocused && (
                  <div className="absolute bottom-[-10px] right-[-10px]">
                    <div className="relative group">
                      <button
                        onMouseDown={(e) => {
                            setResizeHandles(["se"]);
                        }}
                        className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition hover:bg-purple-400 cursor-se-resize relative"
                      >
                        {/* ✅ Purple Inner Circle */}
                        <div className="absolute w-3 h-3 bg-purple-600 rounded-full"></div>
                      </button>
                    </div>
                  </div>
                )}

              {/* Rich Text Editor */}
              <div className="flex-1 overflow-hidden cursor-text relative flex items-center justify-center">
                <ReactQuill
                  ref={quillRef}
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  placeholder="Type your text here" 
                  className="h-full ql-container-fixed border-none outline-none focus:ring-0 custom-quill-placeholder"
                  style={{
                    color: textColor,
                    border: "none",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </ResizableBox>

         {/* ✅ Color & Font Size Buttons */}
          {isFocused && (
            <div className="absolute bottom-[-40px] flex gap-4 w-full justify-between">
              {/* Text Color Options */}
              <div className="flex gap-2">
                {["black", "white", "red", "blue", "green"].map((color, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full border-2 transition ${
                      textColor === color
                        ? color === "white"
                          ? "border-black"
                          : "border-white"
                        : "border-gray-500"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setTextColor(color)}
                  />
                ))}
              </div>

              {/* Font Size Controls */}
              <div className="flex gap-2">
                <button onClick={increaseFontSize} className="w-8 h-6 bg-gray-300 rounded-md border hover:bg-gray-400">
                  A+
                </button>
                <button onClick={decreaseFontSize} className="w-8 h-6 bg-gray-300 rounded-md border hover:bg-gray-400">
                  A-
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default TextInput;
