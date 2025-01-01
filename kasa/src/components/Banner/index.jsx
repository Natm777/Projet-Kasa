import React, { useState } from "react";

// Composant Banner qui accepte des props : imageSrc, text, className et images
function Banner({ imageSrc, text, className = "", images = [] }) {
  // État pour suivre l'index actuel du carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour avancer dans le carrousel
  const nextSlide = () => {
    setCurrentIndex(prevIndex => {
      // Vérifier si l'indice actuel + 1 est égal à la longueur du tableau d'images
      if (prevIndex + 1 === images.length) {
        // Si oui, réinitialiser l'indice à 0 (retourner au début)
        return 0;
      } else {
        // Sinon, simplement incrémenter l'indice
        return prevIndex + 1;
      }
    });
  };

  // Fonction pour reculer dans le carrousel
  const previousSlide = () => {
    setCurrentIndex(prevIndex =>
      // Si l'indice actuel est 0, revenir à la dernière image
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
          {/* Afficher les boutons de navigation si plus d'une image */}
          {images.length > 1 && (
            <>
              <button className="prev" onClick={previousSlide}>
                &#10094;
              </button>
              <button className="next" onClick={nextSlide}>
                &#10095;
              </button>
            </>
          )}
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