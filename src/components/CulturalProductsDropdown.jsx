// components/CulturalProductsDropdown.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const states = [
  { name: "Assam", code: "AS" },
  { name: "West Bengal", code: "WB" },
  { name: "Rajasthan", code: "RJ" },
  { name: "Kerala", code: "KL" },
  { name: "Punjab", code: "PB" },
];

export default function CulturalProductsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/cultural-products"
        className="px-2 xs:px-3 py-2 rounded-md hover:bg-[#0084CC] transition-colors text-sm flex items-center gap-1"
      >
        Cultural Products
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Link>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 mt-1 z-50">
          {states.map((state) => (
            <Link
              key={state.code}
              to={`/cultural-products/${state.code}`}
              className="block px-4 py-2 text-gray-800 hover:bg-blue-50"
            >
              {state.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
