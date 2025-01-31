import React from "react";
import RightContainer from "./RightContainer";

const SimpleLayout: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[70%] h-[90vh] border-4 border-black flex gap-5 p-5">
        {/* Left Container */}
        <div className="flex-1 border-4 border-black bg-blue-200 flex justify-center items-center text-lg font-semibold">
          Left Container
        </div>

        {/* Right Container */}
        <RightContainer />
      </div>
    </div>
  );
};

export default SimpleLayout;
