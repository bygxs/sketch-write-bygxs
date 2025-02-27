import React, { useState } from 'react';

interface DropdownMenuProps {
  saveAsPNG: () => void;
  saveAsJPEG: () => void;
  saveAsBMP: () => void;
  saveAsWebP: () => void;
  saveAsBase64String: () => void;
  saveAsSVG2: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  saveAsPNG,
  saveAsJPEG,
  saveAsBMP,
  saveAsWebP,
  saveAsBase64String,
  saveAsSVG2,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
      >
        Save Options
      </button>
      {isDropdownOpen && (
        /* Z-Index: Set the dropdown menu's z-index to a higher value (e.g., z-20) than the canvas (e.g., z-10). */
        <div className="absolute bottom-full mb-2 right-0 w-48 bg-white border rounded-lg shadow-lg z-20">
          <button onClick={saveAsPNG} className="block w-full text-left p-2 hover:bg-gray-100">💾 PNG</button>
          <button onClick={saveAsJPEG} className="block w-full text-left p-2 hover:bg-gray-100">💾 JPEG</button>
          <button onClick={saveAsBMP} className="block w-full text-left p-2 hover:bg-gray-100">💾 BMP</button>
          <button onClick={saveAsWebP} className="block w-full text-left p-2 hover:bg-gray-100">💾 WEBP</button>
          <button onClick={saveAsBase64String} className="block w-full text-left p-2 hover:bg-gray-100">💾 Base64</button>
          <button onClick={saveAsSVG2} className="block w-full text-left p-2 hover:bg-gray-100">💾 Save as SVG2</button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
