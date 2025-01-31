import React from "react";
import TextIcon from "../assets/Text-icon.png";
import ImageIcon from "../assets/img.svg";
import BackgroundIcon from "../assets/background.svg";
import Logo from "../assets/logo.svg";
import Reset from "../assets/reset.svg?react"

const icons = [
    { src: TextIcon, label: "Text" },
    { src: ImageIcon, label: "Image" },
    { src: BackgroundIcon, label: "Background" },
  ];

const RightContainer: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-5 p-5 border-4 border-black">
      {/* First Section - Title and Logos */}
  <div className="flex items-center justify-between border-2 border-black p-4 rounded-lg">
    {/* Left Side - Logo + Title */}
    <div className="flex items-center gap-3">
      <img src={Logo} alt="Logo" className="w-20 h-20 object-contain" />
      <h2 className="text-xl font-bold">Title Here</h2>
    </div>
  {/* Right Side - Reset Icon (Vertical Layout) */}
  <div className="flex items-center gap-2 border-b-2 border-red-500 pb-">
      <h3 className=" font-bold text-red-500">Reset</h3>
      <Reset className="w-10 h-10 text-red-500"/>
    </div>
  </div>

      {/* Second Section - Random Text */}
      <div className="border-2 border-black p-4 rounded-lg">
        <p className="text-gray-700 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          facilisis.
        </p>
      </div>

      {/* Third Section - Four Square Blocks with Icons and Text */}
      <div className="grid grid-cols-2 gap-4">
        {icons.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 border-1 border-black flex flex-col items-center justify-center shadow-md"
          >
            <img src={item.src} alt={item.label} className="w-25 h-25 mb-2" />
            <span className="text-gray-700 text-sm font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightContainer;
