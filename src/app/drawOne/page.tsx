//src/app/art/page.tsx'
"use client";

import PenIcon from "../icons/PenIcon";
import EraserIcon from "../icons/EraserIcon";
import PaletteIcon from "../icons/PaletteIcon";
import SaveIcon from "../icons/SaveIcon";
import SaveBMPIcon from "../icons/SaveBMPIcon";

import { useState, useRef, useEffect } from "react";
import DropdownMenu from "../../components/dropdownMenu";

/**
 * Main Drawing Page Component
 * Implements canvas drawing functionality with tools and export
 */
export default function DrawingPage() {
  // State Management
  const [selectedTool, setSelectedTool] = useState<"pen" | "eraser">("pen");
  const [canvasColor, setCanvasColor] = useState("#241A03");
  const [penColor, setPenColor] = useState("#1BEA10");
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasColorInputRef = useRef<HTMLInputElement>(null);
  const penColorInputRef = useRef<HTMLInputElement>(null);

  // Canvas Setup Effect
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Configure drawing context
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        setContext(ctx);
      }
      // Set canvas dimensions to match display size
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      /*  To set the canvas size to represent a 52-inch TV screen 
     (1.32m by 0.74m) at a 96 PPI, 
     the canvas dimensions in pixels would be: */

      /*  canvas.width = 4992;
canvas.height = 2808;

*/
    }
  }, []);

  /**
   * Handles mouse/touch start events for drawing
   * @param e - Mouse or touch event
   */
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
    if (context && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      context.beginPath();
      context.moveTo(clientX - rect.left, clientY - rect.top);
      setIsDrawing(true);
    }
  };

  /**
   * Handles drawing motion events
   * @param e - Mouse or touch event
   */
  const handleDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;
    const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
    const rect = canvasRef.current!.getBoundingClientRect();
    // Set stroke properties based on selected tool
    context.strokeStyle = selectedTool === "eraser" ? canvasColor : penColor;
    context.lineWidth = selectedTool === "eraser" ? 20 : 5;
    // Draw line segment
    context.lineTo(clientX - rect.left, clientY - rect.top);
    context.stroke();
  };

  /**
   * Handles canvas background color change
   * @param e - Color input change event
   */
  const handleCanvasColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasColor(e.target.value);
  };

  /**
   * Handles pen color change
   * @param e - Color input change event
   */
  const handlePenColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPenColor(e.target.value);
  };

  /**
   * Saves the canvas as a PNG image, including the background and the drawing.
   */
  const saveAsPNG = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new temporary canvas to combine background and drawing
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      // Set the dimensions of the temporary canvas to match the original
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // First, fill the temporary canvas with the background color (or the ground)
      tempCtx.fillStyle = canvasColor; // Use the selected background color
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Now, draw the current canvas content (the drawing) over the background
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Now we can download the image as PNG
        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/png");
        link.download = "drawing.png"; // Name the downloaded file
        link.click();
      };
    }
  };

  const saveAsJPEG = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new temporary canvas to combine background and drawing
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      // Set the dimensions of the temporary canvas to match the original
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Fill the temporary canvas with the background color
      tempCtx.fillStyle = canvasColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the current canvas content (the drawing) over the background
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Export the temporary canvas as a JPEG
        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/jpeg", 0.9); // Quality set to 0.9
        link.download = "drawing.jpg";
        link.click();
      };
    }
  };

  const saveAsBMP = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new temporary canvas to combine background and drawing
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      // Set the dimensions of the temporary canvas to match the original
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // First, fill the temporary canvas with the background color
      tempCtx.fillStyle = canvasColor; // Use the selected background color
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Now, draw the current canvas content (the drawing) over the background
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Export the temporary canvas as a BMP file
        tempCanvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "drawing.bmp"; // Name the downloaded file
            link.click();

            // Clean up the URL object after the download
            setTimeout(() => URL.revokeObjectURL(link.href), 30000);
          }
        }, "image/bmp");
      };
    }
  };

  const saveAsWebP = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new temporary canvas to combine background and drawing
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      // Set the dimensions of the temporary canvas to match the original
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // First, fill the temporary canvas with the background color
      tempCtx.fillStyle = canvasColor; // Use the selected background color
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Now, draw the current canvas content (the drawing) over the background
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Export the temporary canvas as a WebP file with quality set to 0.9
        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/webp", 0.9); // Quality set to 0.9
        link.download = "drawing.webp"; // Name the downloaded file
        link.click();
      };
    }
  };

  const saveAsBase64String = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new temporary canvas to combine background and drawing
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      // Set the dimensions of the temporary canvas to match the original
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // First, fill the temporary canvas with the background color
      tempCtx.fillStyle = canvasColor; // Use the selected background color
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Now, draw the current canvas content (the drawing) over the background
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Get the Base64 string of the temporary canvas
        const base64String = tempCanvas.toDataURL("image/png");

        // Log the Base64 string to the console (or handle it as needed)
        console.log(base64String); // User can copy from here

        // Optionally, you could also alert or display the string
        alert("Base64 String Copied:\n" + base64String);
      };
    }
  };

  const saveAsSVG2 = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new temporary canvas to combine background and drawing
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    if (tempCtx) {
      // Set the dimensions of the temporary canvas to match the original
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // First, fill the temporary canvas with the background color
      tempCtx.fillStyle = canvasColor; // Use the selected background color
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Now, draw the current canvas content (the drawing) over the background
      const dataURL = canvas.toDataURL("image/png");
      const tempImg = new Image();
      tempImg.src = dataURL;
      tempImg.onload = () => {
        tempCtx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

        // Convert the temporary canvas to an SVG with embedded PNG data
        const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${
            canvas.width
          }" height="${canvas.height}">
            <image href="${tempCanvas.toDataURL("image/png")}" width="${
          canvas.width
        }" height="${canvas.height}" />
          </svg>
        `;

        // Create a Blob from the SVG content
        const blob = new Blob(
          [
            new XMLSerializer().serializeToString(
              new DOMParser().parseFromString(svgContent, "image/svg+xml")
            ),
          ],
          { type: "image/svg+xml" }
        );

        // Create a temporary link to download the SVG file
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "drawing.svg"; // Name the downloaded file
        link.click();

        // Clean up the URL object after the download
        setTimeout(() => URL.revokeObjectURL(link.href), 30000);
      };
    }
  };

  // Drawing functions (startDrawing, handleDraw, etc.) go here...

  return (
    <div className="h-screen flex flex-col">
      {/* Canvas Area */}
      <div
        className="flex-1 relative pb-[84px] z-0" // Set z-0 for the canvas
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
        className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100 border-t flex gap-4 items-center justify-center overflow-x-auto z-10" // Set z-10 for the toolbar
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          height: "84px",
        }}
      >
        <div className="flex justify-center space-x-4">
          {/* Dropdown Menu for Save Options */}
          <DropdownMenu
            saveAsPNG={saveAsPNG}
            saveAsJPEG={saveAsJPEG}
            saveAsBMP={saveAsBMP}
            saveAsWebP={saveAsWebP}
            saveAsBase64String={saveAsBase64String}
            saveAsSVG2={saveAsSVG2}
          />
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
