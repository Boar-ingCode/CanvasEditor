import React, { useRef } from "react";
import TextIcon from "../assets/Text-icon.png";
import ImageIcon from "../assets/img.svg";
import BackgroundIcon from "../assets/background.svg";
import Logo from "../assets/logo.svg";
import Reset from "../assets/reset.svg?react";

const icons = [
  { src: TextIcon, label: "Text" },
  { src: ImageIcon, label: "Image" },
  { src: BackgroundIcon, label: "Background" },
];

interface RightContainerProps {
  setLeftBgColor: (color: string) => void;
  setShowEditor: (show: boolean) => void;
  setImageSrc: (image: string | null) => void;
}

const RightContainer: React.FC<RightContainerProps> = ({ setLeftBgColor, setShowEditor, setImageSrc }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Handle file selection and update image state
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-5 p-5 border-4 border-black">
      {/* ✅ First Section - Title and Logos */}
      <div className="flex items-center justify-between border-2 border-black p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-20 h-20 object-contain" />
          <h2 className="text-xs font-bold">CanvasEditor</h2>
        </div>

        {/* ✅ Reset Button */}
        <button
          className="flex items-center gap-2 border-b-2 border-red-500 pb-1 text-red-500 font-bold hover:text-red-700 transition"
          onClick={() => {
            setImageSrc(null);
            setLeftBgColor("bg-blue-200");
            setShowEditor(false);
          }}
        >
          <h3>Reset</h3>
          <Reset className="w-8 h-8" />
        </button>
      </div>

      {/* ✅ Clickable Icons */}
      <div className="grid grid-cols-2 gap-4">
        {icons.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 border border-black flex flex-col items-center justify-center shadow-md  
                       cursor-pointer hover:bg-gray-300 transition duration-300 transform hover:scale-105 active:scale-95"
            onClick={() => {
              if (item.label === "Text") {
                setShowEditor(true);
              } else if (item.label === "Background") {
                setLeftBgColor("bg-gray-400");
              } else if (item.label === "Image") {
                fileInputRef.current?.click(); // ✅ Open file input manually
              }
            }}
          >
            <img src={item.src} alt={item.label} className="w-16 h-16 mb-2" />
            <span className="text-gray-700 text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ✅ Hidden File Input */}
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
    </div>
  );
};

export default RightContainer;
