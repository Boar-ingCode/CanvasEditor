import  { forwardRef, useEffect } from "react";
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
  setBgImage: (image: string | null) => void;
  resetBg: boolean; 
  setResetBg: (reset: boolean) => void; 
  content: string;
  setContent: (content: string) => void;
}


const LeftContainer = forwardRef<HTMLDivElement, LeftContainerProps>(
  (
    { bgColor, showEditor, setShowEditor, imageSrc, setImageSrc, bgImage, setBgImage, content, setContent },
    ref
  ) => {
    useEffect(() => {
      if (!bgImage) {
        console.log("🖼 Setting default background image...");
        setBgImage(BGimage);
      }
    }, [setBgImage]); 

    return (
      <div
        ref={ref}
        className="relative flex-1 flex justify-center items-center p-5"
        style={{
          backgroundColor: bgImage ? "transparent" : bgColor, // ✅ Use bgColor only if no image
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {imageSrc && <ImageInput imageSrc={imageSrc} setImageSrc={setImageSrc} />}
        {showEditor && (
          <TextInput
            content={content}
            setContent={setContent}
            onDelete={() => {
              setShowEditor(false);
              setContent("");
            }}
          />
        )}
      </div>
    );
  }
);

export default LeftContainer;
