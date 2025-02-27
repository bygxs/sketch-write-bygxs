"use client";

import PenIcon from "../icons/PenIcon";
import EraserIcon from "../icons/EraserIcon";
import PaletteIcon from "../icons/PaletteIcon";
import SaveIcon from "../icons/SaveIcon";
import DropdownMenu from "../../components/dropdownMenu";
import SaveComponent from "../../components/SaveComponent"; // Import the SaveComponent

import { useState, useRef, useEffect } from "react";

export default function DrawingPage() {
  // State Management
  const [selectedTool, setSelectedTool] = useState<"pen" | "eraser">("pen");
  const [canvasColor, setCanvasColor] = useState("#241A03");
  const [penColor, setPenColor] = useState("#1BEA10");
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasColorInputRef = useRef<HTMLInputElement>(null);
  const penColorInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize SaveComponent
  const {
    saveAsPNG,
    saveAsJPEG,
    saveAsBMP,
    saveAsWebP,
    saveAsBase64String,
    saveAsSVG2,
  } = SaveComponent({ canvasRef, canvasColor });

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

  return (
    <div className="h-screen flex flex-col">
      {/* Canvas Area */}
      <div
        className="flex-1 relative pb-[84px] z-0"
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
        className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100 border-t flex gap-4 items-center justify-center overflow-visible z-10"
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
                className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
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