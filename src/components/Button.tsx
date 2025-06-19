import React from "react";

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  "aria-label": ariaLabel,
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
  >
    {children}
  </button>
);

export default Button;
