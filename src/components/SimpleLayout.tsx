import React from "react";

const SimpleLayout: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Main Container */}
      <div className="w-[60%] h-[90vh] border-4 border-black flex gap-5 p-5">
        {/* Left Container */}
        <div className="flex-1 border-4 border-black bg-blue-200 flex justify-center items-center text-lg font-semibold">
          Left Container
        </div>
        {/* Right Container */}
        <div className="flex-1 border-4 border-black bg-green-200 flex justify-center items-center text-lg font-semibold">
          Right Container
        </div>
      </div>
    </div>
  );
};

export default SimpleLayout;
