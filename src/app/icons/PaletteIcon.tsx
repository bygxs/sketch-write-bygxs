import React from "react";

const PaletteIcon = ({ selected }: { selected: boolean }) => (
  <svg
    className={`w-6 h-6 ${selected ? "text-blue-500" : "text-gray-600"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-.28 0-.52.22-.53.5 0 .16.08.31.22.41l.42.28c.34.23.58.61.58 1.03s-.24.8-.58 1.03l-.42.28c-.14.1-.22.25-.22.41 0 .28.25.5.53.5.28 0 .5-.22.5-.5 0-.16-.08-.31-.22-.41l-.42-.28c-.34-.23-.58-.61-.58-1.03s.24-.8.58-1.03l.42-.28c.14-.1.22-.25.22-.41 0-.28-.22-.5-.5-.5zM6.75 12c0-.41.34-.75.75-.75.41 0 .75.34.75.75 0 .41-.34.75-.75.75-.41 0-.75-.34-.75-.75zM17.25 12c0-.41-.34-.75-.75-.75-.41 0-.75.34-.75.75 0 .41.34.75.75.75.41 0 .75-.34.75-.75z"
    />
  </svg>
);

export default PaletteIcon;
