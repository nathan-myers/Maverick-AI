import React from "react";
import { LucideIcon } from "lucide-react";
import { Tooltip } from "./Tooltip";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: LucideIcon;
  iconClassName?: string;
  tooltip?: string;
  tooltipLocation?: "top" | "bottom" | "left" | "right";
}

export function Button({
  children,
  variant = "primary",
  icon: Icon,
  iconClassName = "",
  className = "",
  tooltip = "",
  tooltipLocation = "top",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
  };

  const buttonContent = (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}>
      {Icon && <Icon className={`h-5 w-5 ${iconClassName || ""}`} />}
      {children && <span>{children}</span>}
    </button>
  );

  return tooltip ? (
    <Tooltip text={tooltip} position={tooltipLocation}>
      {buttonContent}
    </Tooltip>
  ) : (
    buttonContent
  );
}
