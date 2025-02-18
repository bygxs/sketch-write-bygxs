import React from "react";

const EraserIcon = ({ selected }: { selected: boolean }) => (
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
      d="M11 2h2M6.293 6.293l12.14 12.14a2 2 0 010 2.828L16 20a2 2 0 01-2.828 0L3.93 7.93a2 2 0 010-2.828L7 2a2 2 0 012.828 0L12 4.828a2 2 0 012.828 0l2.34 2.34a2 2 0 010 2.828z"
    />
  </svg>
);

export default EraserIcon;
