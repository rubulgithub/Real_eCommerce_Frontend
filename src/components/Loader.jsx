import React from "react";

const Loader = ({ childern }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500">
        {childern}
      </div>
    </div>
  );
};

export default Loader;
