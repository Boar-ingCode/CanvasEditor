import { forwardRef,  } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import BGimage from "../assets/start-image.png";

interface LeftContainerProps {
  bgColor: string;
  showEditor: boolean;
  setShowEditor: (show: boolean) => void;
  imageSrc: string | null;
  setImageSrc: (image: string | null) => void;
  bgImage: string | null;
  resetBg: boolean;
  content: string; // ✅ Add content prop
  setContent: (value: string) => void; // ✅ Add setContent prop
}

const LeftContainer = forwardRef<HTMLDivElement, LeftContainerProps>(
  ({ bgColor, showEditor, setShowEditor, imageSrc, setImageSrc, bgImage, resetBg, content, setContent }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex-1 border-4 border-black flex justify-center items-center p-5"
        style={{
          backgroundColor: bgColor, 
          backgroundImage: resetBg
            ? "none"
            : bgImage
            ? `url(${bgImage})`
            : `url(${BGimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {imageSrc && <ImageInput imageSrc={imageSrc} setImageSrc={setImageSrc} />}
        {showEditor && (
          <TextInput
            content={content} // ✅ Now using prop instead of state
            setContent={setContent} // ✅ Pass function to update text
            onDelete={() => {
              setShowEditor(false);
              setContent(""); // ✅ Clear text when deleting
            }}
          />
        )}
      </div>
    );
  }
);

export default LeftContainer;
