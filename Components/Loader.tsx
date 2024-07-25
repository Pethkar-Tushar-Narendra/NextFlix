import React from "react";

const Loader = () => {
  return (
    <div className="flex space-x-2 h-full w-full items-center justify-center">
      <div className="w-4 h-4 bg-red-600 rounded-full dot1"></div>
      <div className="w-4 h-4 bg-red-600 rounded-full dot2"></div>
      <div className="w-4 h-4 bg-red-600 rounded-full dot3"></div>
    </div>
  );
};

export default Loader;
