"use client";

import PenIcon from "../icons/PenIcon";
import EraserIcon from "../icons/EraserIcon";
import PaletteIcon from "../icons/PaletteIcon";
import SaveIcon from "../icons/SaveIcon";
import SaveBMPIcon from "../icons/SaveBMPIcon";

import { useState, useRef, useEffect } from "react";
import DropdownMenu from "../../components/dropdownMenu";

export default function DrawingPage() {
  // State Management
  const [selectedTool, setSelectedTool] = useState<"pen" | "eraser">("pen");
  const [canvasColor, setCanvasColor] = useState("#241A03");
  const [penColor, setPenColor] = useState("#1BEA10");
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasColorInputRef = useRef<HTMLInputElement>(null);
  const penColorInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown menu

  // Canvas Setup Effect
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        setContext(ctx);
      }
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  }, []);

  // Drawing Functions
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
    if (context && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      context.beginPath();
      context.moveTo(clientX - rect.left, clientY - rect.top);
      setIsDrawing(true);
    }
  };

  const handleDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;
    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
    const rect = canvasRef.current!.getBoundingClientRect();
    context.strokeStyle = selectedTool === "eraser" ? canvasColor : penColor;
    context.lineWidth = selectedTool === "eraser" ? 20 : 5;
    context.lineTo(clientX - rect.left, clientY - rect.top);
    context.stroke();
  };

  // Color Change Handlers
  const handlePenColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPenColor(e.target.value); // Update pen color
  };

  const handleCanvasColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasColor(e.target.value); // Update canvas background color
  };

  // Click Outside Handler for Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Save Functions
  const saveAsPNG = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill with canvas background color
      tempCtx.fillStyle = canvasColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the canvas content
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Trigger download
        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/png");
        link.download = "drawing.png";
        link.click();
      };
    }
  };

  const saveAsJPEG = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill with canvas background color
      tempCtx.fillStyle = canvasColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the canvas content
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Trigger download
        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/jpeg", 0.9); // Quality: 0.9
        link.download = "drawing.jpg";
        link.click();
      };
    }
  };

  const saveAsBMP = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill with canvas background color
      tempCtx.fillStyle = canvasColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the canvas content
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Trigger download
        tempCanvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "drawing.bmp";
            link.click();
          }
        }, "image/bmp");
      };
    }
  };

  const saveAsWebP = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill with canvas background color
      tempCtx.fillStyle = canvasColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the canvas content
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Trigger download
        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/webp", 0.9); // Quality: 0.9
        link.download = "drawing.webp";
        link.click();
      };
    }
  };

  const saveAsBase64String = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill with canvas background color
      tempCtx.fillStyle = canvasColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the canvas content
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Get Base64 string
        const base64String = tempCanvas.toDataURL("image/png");
        console.log(base64String); // Log to console
        alert("Base64 String Copied:\n" + base64String); // Show to user
      };
    }
  };

  const saveAsSVG2 = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill with canvas background color
      tempCtx.fillStyle = canvasColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the canvas content
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Create SVG
        const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
            <image href="${tempCanvas.toDataURL("image/png")}" width="${canvas.width}" height="${canvas.height}" />
          </svg>
        `;

        // Trigger download
        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "drawing.svg";
        link.click();
      };
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Canvas Area */}
      <div
        className="flex-1 relative pb-[84px] z-0" // z-0 for canvas
        style={{
          backgroundColor: canvasColor,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          onMouseDown={startDrawing}
          onMouseUp={() => setIsDrawing(false)}
          onMouseMove={handleDraw}
          onTouchStart={startDrawing}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={handleDraw}
        />
      </div>

      {/* Bottom Toolbar */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100 border-t flex gap-4 items-center justify-center overflow-visible z-10" // z-10 for toolbar
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          height: "84px",
        }}
      >
        <div className="flex justify-center space-x-4 relative">
          {/* Save Button with Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-lg bg-white hover:bg-gray-50"
            >
              <SaveIcon />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20" // z-20 for dropdown
              >
                <DropdownMenu
                  saveAsPNG={saveAsPNG}
                  saveAsJPEG={saveAsJPEG}
                  saveAsBMP={saveAsBMP}
                  saveAsWebP={saveAsWebP}
                  saveAsBase64String={saveAsBase64String}
                  saveAsSVG2={saveAsSVG2}
                />
              </div>
            )}
          </div>

          {/* Pen Tool */}
          <label className="relative cursor-pointer">
            <input
              type="color"
              ref={penColorInputRef}
              className="absolute opacity-0 w-0 h-0"
              value={penColor}
              onChange={handlePenColorChange}
            />
            <div
              onClick={() => setSelectedTool("pen")}
              className={`p-2 rounded-lg ${
                selectedTool === "pen" ? "bg-blue-100" : "bg-white"
              }`}
            >
              <PenIcon selected={selectedTool === "pen"} />
            </div>
          </label>

          {/* Canvas Color Picker */}
          <label className="relative cursor-pointer">
            <input
              type="color"
              ref={canvasColorInputRef}
              className="absolute opacity-0 w-0 h-0"
              value={canvasColor}
              onChange={handleCanvasColorChange}
            />
            <div className="p-2 rounded-lg bg-white hover:bg-gray-50">
              <PaletteIcon />
            </div>
          </label>

          {/* Eraser Tool */}
          <button
            onClick={() => setSelectedTool("eraser")}
            className={`p-2 rounded-lg ${
              selectedTool === "eraser" ? "bg-blue-100" : "bg-white"
            }`}
          >
            <EraserIcon selected={selectedTool === "eraser"} />
          </button>
        </div>
      </div>
    </div>
  );
}