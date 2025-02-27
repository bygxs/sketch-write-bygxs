"use client";

import { useState, useRef, useEffect } from "react";
import SaveComponent from "../../components/SaveComponent"; // Import the SaveComponent

export default function DrawingPage() {
  // State Management
  const [selectedTool, setSelectedTool] = useState<"pen" | "eraser">("pen");
  const [canvasColor, setCanvasColor] = useState("#241A03");
  const [penColor, setPenColor] = useState("#1BEA10");
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

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
    setPenColor(e.target.value);
  };

  const handleCanvasColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasColor(e.target.value);
  };

  // Click Outside Handler for Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
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
        className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100 dark:bg-gray-800 border-t flex gap-4 items-center justify-center overflow-visible z-10"
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
              className="p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              💾
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20">
                <div className="p-2 space-y-2">
                  <button
                    onClick={saveAsPNG}
                    className="w-full flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <span className="mr-2">🖼️</span>
                    <span>PNG</span>
                  </button>
                  <button
                    onClick={saveAsJPEG}
                    className="w-full flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <span className="mr-2">🖼️</span>
                    <span>JPEG</span>
                  </button>
                  <button
                    onClick={saveAsBMP}
                    className="w-full flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <span className="mr-2">🖼️</span>
                    <span>BMP</span>
                  </button>
                  <button
                    onClick={saveAsWebP}
                    className="w-full flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <span className="mr-2">🖼️</span>
                    <span>WebP</span>
                  </button>
                  <button
                    onClick={saveAsBase64String}
                    className="w-full flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <span className="mr-2">📄</span>
                    <span>Base64</span>
                  </button>
                  <button
                    onClick={saveAsSVG2}
                    className="w-full flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <span className="mr-2">🖌️</span>
                    <span>SVG</span>
                  </button>
                </div>
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
                selectedTool === "pen"
                  ? "bg-blue-100 dark:bg-blue-800"
                  : "bg-white dark:bg-gray-700"
              }`}
            >
              🖌️
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
            <div className="p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              🎨
            </div>
          </label>

          {/* Eraser Tool */}
          <button
            onClick={() => setSelectedTool("eraser")}
            className={`p-2 rounded-lg ${
              selectedTool === "eraser"
                ? "bg-blue-100 dark:bg-blue-800"
                : "bg-white dark:bg-gray-700"
            }`}
          >
            🧽
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
}
