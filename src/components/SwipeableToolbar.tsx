import React, { useState, useRef, useEffect, JSX } from "react";

interface SwipeableToolbarProps {
  tools: { label: string; icon: JSX.Element; onClick: () => void }[];
}

const SwipeableToolbar: React.FC<SwipeableToolbarProps> = ({ tools }) => {
  const [visible, setVisible] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Handle touch/swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setVisible(true);
  };

  // Close toolbar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={toolbarRef}
      className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white rounded-t-lg p-2"
      onTouchStart={handleTouchStart}
      style={{ display: visible ? "block" : "none" }}
    >
      <div className="flex justify-around">
        {tools.map((tool, index) => (
          <button
            key={index}
            className="p-2 rounded-md hover:bg-gray-700"
            onClick={tool.onClick}
          >
            {tool.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SwipeableToolbar;
