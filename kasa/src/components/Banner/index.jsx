import React, { useState } from "react";


function Banner({ imageSrc, text, className = "", images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour avancer dans le carrousel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour reculer dans le carrousel
  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`banner ${className}`}>
      {/* Si des images sont fournies, affichez le carrousel */}
      {images.length > 0 ? (
        <>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="banner-image"
          />
          <button className="prev" onClick={previousSlide}>
            &#10094;
          </button>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
          <div className="slide-index">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      ) : (
        // Sinon, affichez l'image et le texte classique
        <>
          <img src={imageSrc} alt="Bannière" className="banner-image" />
          {text && <h1 className="banner-text">{text}</h1>}
        </>
      )}
    </div>
  );
}

export default Banner;