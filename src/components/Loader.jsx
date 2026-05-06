import React from "react";
import "../css/Loader.css"; // external css

const RingLoader = () => {
  return (
    <div className="ring-loader">
      <div className="ring"></div>
      <p>Loading...</p>
    </div>
  );
};

export default RingLoader;
