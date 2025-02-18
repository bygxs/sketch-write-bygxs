//src/app/art/page.tsx'
"use client";

import PenIcon from "../icons/PenIcon";
import EraserIcon from "../icons/EraserIcon";
import PaletteIcon from "../icons/PaletteIcon";
import SaveIcon from "../icons/SaveIcon";
import SaveBMPIcon from "../icons/SaveBMPIcon";

import { useState, useRef, useEffect } from "react";

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

  /**
   * BMP (Bitmap) is a raster graphics image file format that stores bitmap digital images.
   * It is known for its simplicity and wide compatibility across platforms and applications.
   * BMP files are typically uncompressed, preserving all image data without loss of quality,
   * making them suitable for scenarios where image fidelity is critical, such as graphic design
   * and medical imaging. However, BMP files tend to be larger in size compared to other formats
   * like PNG or JPEG, which may not be ideal for web use or storage efficiency.
   */

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

  /**
   * WebP is an image format developed by Google that provides both lossy and lossless compression
   * for images on the web. It offers superior compression compared to traditional formats like JPEG
   * and PNG, resulting in smaller file sizes while maintaining high quality. WebP supports alpha
   * transparency, making it suitable for images with transparent backgrounds, and can also be used
   * for animated images. While most modern browsers support WebP, some older browsers may not,
   * so it's important to consider fallback options. WebP is ideal for optimizing web performance
   * and reducing bandwidth usage while delivering high-quality visuals.
   */

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

  /**
   *Base64 String  It is commonly used to encode images,files, or other binary data for transmission over text-based protocols such as HTTP or email.
   *  Base64 String is a binary-to-text encoding scheme that represents binary data in an ASCII string
   * format by translating it into a radix-64 representation.Base64 encoding increases the size of
   * the data by approximately 33%, but it allows for easy
   * embedding of binary content directly within text files, such as HTML or CSS. This is particularly
   * useful for including small images or files inline, reducing the number of HTTP requests needed
   * for web pages. However, for larger files, it is generally more efficient to use standard file
   * references instead of embedding them as Base64 strings.
   */

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

  /**
   * SVG (Scalable Vector Graphics) is an XML-based vector image format used for defining two-dimensional
   * graphics with support for interactivity and animation. Unlike raster formats (e.g., JPEG, PNG), SVG
   * images are composed of paths, shapes, and text, allowing them to be scaled infinitely without loss
   * of quality. This makes SVG ideal for responsive web design, logos, icons, and illustrations. SVG
   * files are lightweight and can be manipulated via CSS and JavaScript, enabling dynamic and interactive
   * graphics. Additionally, SVG supports features like transparency, gradients, and filters. However,
   * complex SVG files can become large and may require optimization for performance in web applications.
   */

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

  return (
    <div className="h-screen flex flex-col">
      {/* Canvas Area */}
      <div
        className="flex-1 relative pb-[84px]"
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
        className="fixed bottom-0 left-0 right-0 p-4 bg-gray-100 border-t flex gap-4 items-center justify-center overflow-x-auto"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          height: "84px",
        }}
      >
        <div className="flex justify-center space-x-4">
          {/* Save as PNG */}
          <button
            onClick={saveAsPNG}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            💾 PNG
          </button>
          {/* Save as JPEG */}
          <button
            onClick={saveAsJPEG}
            className="p-2 rounded-lg bg-green-500 hover:bg-gray-50"
          >
            💾 JPEG
          </button>
          {/* Save as BMP */}
          <button
            onClick={saveAsBMP}
            className="p-2 rounded-lg bg-pink-300 hover:bg-pink-900"
          >
            💾 BMP
          </button>
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

          {/* Save as WebP */}
          <button
            onClick={saveAsWebP}
            className="p-2 rounded-lg bg-indigo-500 hover:bg-indigo-900"
          >
            💾 WEBP
          </button>
          {/* Save as Base64 String */}
          <button
            onClick={saveAsBase64String}
            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-950"
          >
            💾 Base64
          </button>
          {/* Save as SVG */}
          <button
            onClick={saveAsSVG2}
            className="p-2 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-900"
          >
            💾 Save as SVG2
          </button>
        </div>
      </div>
    </div>
  );
}
