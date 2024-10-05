import React from "react";

export default function PopOver({ children, tilte }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-500 text-white text-xs rounded py-1 px-2 w-20 text-center">
        {tilte}
      </div>
    </div>
  );
}
