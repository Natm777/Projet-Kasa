import React, { useState } from "react";

// Composant Banner qui accepte des props
function Carrousel({ images = [] }) {
  // État pour suivre l'index actuel du carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour avancer dans le carrousel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 1 === images.length) {
        // Vérifier si l'indice actuel + 1 est égal à la longueur du tableau d'images
        return 0; // Si oui, réinitialiser l'indice à 0 (retourner au début)
      } else {
        return prevIndex + 1; // Sinon, simplement incrémenter l'indice
      }
    });
  };

  // Fonction pour reculer dans le carrousel
  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      // Si l'indice actuel est 0, revenir à la dernière image du tableau sinon décrémenter l'indice
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carrousel">
      <>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carrousel-image"
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
    </div>
  );
}

export default Carrousel;
