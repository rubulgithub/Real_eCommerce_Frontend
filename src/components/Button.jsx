import React from "react";

function Button({
  type = "button",
  children,
  onClick,
  bgColor,
  textColor,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${bgColor} ${textColor} w-full py-2 rounded-lg font-medium transition-colors`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
