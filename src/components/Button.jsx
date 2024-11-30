import React from "react";

function Button({ children, onClick, bgColor, textColor, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} w-full py-2 rounded-lg font-medium transition-colors`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
