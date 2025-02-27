"use client";

import { useRef } from "react";

interface SaveComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasColor: string;
}

export default function SaveComponent({
  canvasRef,
  canvasColor,
}: SaveComponentProps) {
  // Save as PNG
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

  // Save as JPEG
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

  // Save as BMP
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

  // Save as WebP
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

  // Save as Base64 String
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

  // Save as SVG
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
          <svg xmlns="http://www.w3.org/2000/svg" width="${
            canvas.width
          }" height="${canvas.height}">
            <image href="${tempCanvas.toDataURL("image/png")}" width="${
          canvas.width
        }" height="${canvas.height}" />
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

  return {
    saveAsPNG,
    saveAsJPEG,
    saveAsBMP,
    saveAsWebP,
    saveAsBase64String,
    saveAsSVG2,
  };
}
