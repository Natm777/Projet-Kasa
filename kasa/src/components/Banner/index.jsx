import React from "react";

function Banner({ imageSrc, text, className = "" }) {
  return (
    <div className={`banner ${className}`}>
      <img src={imageSrc} alt="Bannière" className="banner-image" />
      {text && <h1 className="banner-text">{text}</h1>}
    </div>
  );
}

export default Banner;