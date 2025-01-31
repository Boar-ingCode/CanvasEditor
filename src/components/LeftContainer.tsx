import React from "react";
import StartImage from "../assets/start-image.png";

const LeftContainer: React.FC = () => {
  return (
    <div className="flex-1 border-4 border-black bg-blue-200 flex justify-center items-center">
      <img src={StartImage} alt="Start" className="w-full h-full object-cover" />
    </div>
  );
};

export default LeftContainer;