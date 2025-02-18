// src/app/icons/PenIcon.tsx
import React from "react";

const PenIcon = ({ selected }: { selected: boolean }) => (
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
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

export default PenIcon;
