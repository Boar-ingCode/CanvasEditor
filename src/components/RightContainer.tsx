import React, { useState, useRef } from "react";
import ExportButton from "./ExportButton";
import TextIcon from "../assets/text.svg";
import ImageIcon from "../assets/img.svg";
import BackgroundIcon from "../assets/background.svg";
import Logo from "../assets/logo.svg";
import ResetIcon from "../assets/reset.svg?react";
import Warning from "../assets/alert.svg?react";

const icons = [
  { src: TextIcon, label: "Text" },
  { src: ImageIcon, label: "Image" },
  { src: BackgroundIcon, label: "Background" },
];

interface RightContainerProps {
  showEditor: boolean; // ✅ Add this
  imageSrc: string | null; // ✅ Add this
  setLeftBgColor: (color: string) => void;
  setShowEditor: (show: boolean) => void;
  setImageSrc: (image: string | null) => void;
  setBgImage: (image: string | null) => void;
  setResetBg: (reset: boolean) => void; // ✅ FIXED: Add this!
  leftContainerRef: React.RefObject<HTMLDivElement>;
  handleReset: () => void; // ✅ Make sure this exists
}

const RightContainer: React.FC<RightContainerProps> = ({
  setLeftBgColor,
  setShowEditor,
  setImageSrc,
  setBgImage,
  setResetBg,
  leftContainerRef,
  showEditor, // ✅ Now it exists
  imageSrc, // ✅ Now it exists
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "background") => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "image") {
          setImageSrc(reader.result as string);
        } else {
          setBgImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    console.log("🔴 Resetting background...");
    setImageSrc(null);
    setBgImage(null);
    setLeftBgColor("#9B9B9B"); // ✅ Reset background color
    setShowEditor(false);
    setResetBg(true); // ✅ Fix: Now it works!
    setShowWarning(false);
  };

  const handleTextOrImageClick = (type: "text" | "image") => {
    console.log(`🟢 Changing LeftContainer background to ${type === "text" ? "gray" : "default"}`);
  
    if (type === "text" && !showEditor) {
      setShowEditor(true);
      setLeftBgColor("#9B9B9B");
    } 
    
    if (type === "image" && !imageSrc) {
      fileInputRef.current?.click();
    }
  
    setBgImage(null);
    setActiveButton(type); // ✅ Temporarily set active button
  
    setTimeout(() => setActiveButton(null), 500); // ✅ Remove active state after 500ms
  };
  
  return (
    <div className="flex-1 flex flex-col gap-5 p-5 relative">
      {/* ✅ First Section - Title and Logos */}
      <div className="flex items-center justify-between p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-20 h-20 object-contain" />
          <h2 className="text-2xl font-bold">CanvasEditor</h2>
        </div>

        {/* ✅ Reset Button - Opens Warning Popup */}
        <button
          className="flex items-center gap-2 border-b-2 border-red-500 pb-1 text-lg text-red-500 font-bold hover:text-red-700 transition"
          onClick={() => setShowWarning(true)} // ✅ Show the warning popup
        >
          <h3>Reset</h3>
          <ResetIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-[#F7F7F8] p-4 rounded-lg">
        <p className="text-gray-700">Add Content</p>
      </div>

      {/* ✅ Clickable Icons */}
      <div className="grid grid-cols-2 gap-4">
        {icons.map((item, index) => (
        <div
          key={index}
          className={`bg-[#F7F7F8] p-15 flex flex-col items-center justify-center shadow-md cursor-pointer 
            hover:bg-gray-500 transition duration-300 transform hover:scale-105 active:scale-95 
            ${activeButton === item.label.toLowerCase() ? "border-4 border-purple-500" : ""}`}
          onClick={() => {
            if (item.label === "Text") {
              handleTextOrImageClick("text");
            } else if (item.label === "Image") {
              handleTextOrImageClick("image");
            } else if (item.label === "Background") {
              bgFileInputRef.current?.click();
              setActiveButton("background");
              setTimeout(() => setActiveButton(null), 500); // ✅ Remove border after delay
            }
          }}
        >
          <img src={item.src} alt={item.label} className="w-16 h-16 mb-2" />
          <span className="text-gray-700 text-sm font-medium">{item.label}</span>
        </div>
    ))}
</div>

      <div className="flex justify-end mt-4">
        <ExportButton targetRef={leftContainerRef} />
      </div>

      <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleImageUpload(e, "image")} className="hidden" />
      <input type="file" accept="image/*" ref={bgFileInputRef} onChange={(e) => handleImageUpload(e, "background")} className="hidden" />

      {/* ✅ Warning Popup */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] text-center relative rounded-lg">
          
            {/* Close Button */}
            <button 
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition"
              onClick={() => setShowWarning(false)}
            >
              ✕
            </button>

            {/* Warning Icon */}
            <Warning className="w-72 h-72 mx-auto text-red-500 fill-current" /> 

            {/* Warning Title */}
            <h1 className="text-black-700 text-3xl font-bold mt-4">WARNING</h1>

            {/* Warning Message */}
            <p className="text-gray-700 mt-4 text-lg">
              You’re about to reset the whole process. Are you sure you want to do it?
            </p>

            {/* ✅ Buttons */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                className="px-6 py-3 bg-gray-300 text-sm rounded-lg hover:bg-gray-400 transition"
                onClick={() => setShowWarning(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 bg-[#7209B7] text-white text-base rounded-lg hover:bg-red-700 transition"
                onClick={handleReset} // ✅ Call function here!
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightContainer;
