import React, { useState } from "react";

interface TooltipProps {
  position?: "top" | "bottom" | "left" | "right";
  text?: string;
  children?: React.ReactNode;
}

export function Tooltip({
  position = "top",
  text = "",
  children,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Define positioning classes for Tailwind CSS
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  // Arrow positioning classes with bigger border width
  const arrowClasses = {
    top: "left-1/2 transform -translate-x-1/2 -bottom-3 border-t-8 border-t-gray-800",
    bottom:
      "left-1/2 transform -translate-x-1/2 -top-3 border-b-8 border-b-gray-800",
    left: "top-1/2 transform -translate-y-1/2 -right-3 border-l-8 border-l-gray-800",
    right:
      "top-1/2 transform -translate-y-1/2 -left-3 border-r-8 border-r-gray-800",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0} // Makes the element focusable
      aria-describedby={isVisible ? "tooltip" : undefined}>
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-10 p-2 text-sm text-white bg-gray-800 rounded shadow-lg ${positionClasses[position]} whitespace-nowrap transition-opacity duration-300 ease-in-out opacity-100`}>
          {text}
          <div
            className={`absolute w-0 h-0 border-8 border-transparent ${arrowClasses[position]}`}></div>
        </div>
      )}
    </div>
  );
}
