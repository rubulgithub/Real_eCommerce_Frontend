import React from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <Link to="/cart" className="flex items-center gap-1 sm:gap-2 text-gray-700">
      <div className="relative">
        <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
      </div>
      <span className="hidden sm:inline text-xs sm:text-sm lg:text-base">
        Cart
      </span>
    </Link>
  );
};

export default Cart;
