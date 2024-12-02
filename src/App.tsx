import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Canvas, FabricImage } from "fabric";
import tShirtImg from './assets/t-shirt.png'

const Main = () => {
  const [canvas, setCanvas] = useState<Canvas>();
  const [bgImgSrc, setBgImgSrc] = useState<string>();
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const fileEl = useRef<HTMLInputElement>(null);

  const handleUploadImageClick = () => {
    fileEl.current?.click();
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files || e.target.files.length <= 0) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBgImgSrc((reader.result as string) || "");
    };
    reader.readAsDataURL(file);
  };


  useEffect(() => {
    const canvas = new Canvas(canvasEl.current ?? undefined);
    setCanvas(canvas);

    const img = new Image();
    img.src = tShirtImg;
    img.onload = () => {
      const fabricImage = new FabricImage(img);

      canvas.viewportCenterObject(fabricImage)
      canvas.set("backgroundImage", fabricImage)
      canvas.renderAll();
    };
  }, []);

  useEffect(() => {
    if (!canvas || !bgImgSrc) return;

    const img = new Image();
    img.src = bgImgSrc;
    img.onload = () => {
      const fabricImage = new FabricImage(img);
      canvas.viewportCenterObject(fabricImage)
      canvas.add(fabricImage);
      canvas.setActiveObject(fabricImage);
    };
  }, [bgImgSrc, canvas]);


  return (
    <div className="w-screen mx-auto mt-8 items-center justify-center flex flex-col gap-y-6">
      <canvas
        width="1024"
        height="768"
        className="border-solid border-2 border-gray-300"
        ref={canvasEl}
      />
      <div className="flex justify-between items-center w-1024">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <button className='bg-gray-600 text-white p-4 rounded-sm' onClick={handleUploadImageClick}>Upload Image</button>
            <input
              type="file"
              className="hidden"
              ref={fileEl}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
