import React from "react";
import { toPng } from "html-to-image";

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const ExportButton: React.FC<ExportButtonProps> = ({ targetRef }) => {
  const handleExport = async () => {
    if (targetRef.current) {
      try {
        const dataUrl = await toPng(targetRef.current, {
          width: 1080, // ✅ Ensuring correct width
          height: 1350, // ✅ Ensuring correct height
          style: {
            transform: "scale(1)", // Prevents any weird scaling
            transformOrigin: "center", // Ensures everything is properly centered
          },
          cacheBust: true,
          backgroundColor: "white", // Ensures background isn't transparent
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "canvas-export.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Failed to export image:", error);
      }
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-[#7209B7] text-white px-4 py-2 text-sm rounded-lg shadow-md hover:bg-[#5a078d] transition"
    >
      Export to PNG
    </button>
  );
};

export default ExportButton;
