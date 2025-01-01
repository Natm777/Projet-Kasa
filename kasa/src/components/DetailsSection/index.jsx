// Importation des bibliothèques nécessaires
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

// Déclaration du composant fonctionnel DetailsSection
function DetailsSection({ title, content = "Aucun contenu disponible" }) {
  // État pour suivre si la section est ouverte ou fermée
  const [isOpen, setIsOpen] = useState(false);
  // Références pour les éléments DOM
  const detailsRef = useRef(null);
  const contentRef = useRef(null);

  // Fonction pour basculer l'état ouvert/fermé
  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  // Effet pour ajouter et nettoyer l'écouteur d'événements
  useEffect(() => {
    // Récupère l'élément DOM référencé par detailsRef
    const detailsElement = detailsRef?.current;

    // Si l'élément DOM existe
    if (detailsElement) {
      // Ajoute un écouteur d'événements pour le clic sur l'élément
      detailsElement.addEventListener("click", handleToggle);
    }

    // Fonction de nettoyage pour retirer l'écouteur d'événements lors du démontage du composant
    return () => {
      if (detailsElement) {
        detailsElement.removeEventListener("click", handleToggle);
      }
    };
  }, []); // Exécuté une seule fois au montage du composant

  return (
    // Conteneur principal de la section de détails avec une référence et une classe CSS
    <div ref={detailsRef} className={`details-section`}>
      {/* Élément de résumé qui affiche le titre et une flèche SVG */}
      <summary>
        {title}
        {/* Flèche SVG qui change d'orientation en fonction de l'état isOpen */}
        <svg
          className={`details-arrow ${isOpen ? "open" : ""}`}
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2897 10.7897C15.9591 10.1202 17.0462 10.1202 17.7157 10.7897L27.9979 21.0719C28.6674 21.7414 28.6674 22.8285 27.9979 23.4979C27.3285 24.1673 26.2414 24.1673 25.572 23.4979L16.5 14.4259L7.42804 23.4926C6.75862 24.162 5.67148 24.162 5.00206 23.4926C4.33265 22.8231 4.33265 21.736 5.00206 21.0666L15.2843 10.7843L15.2897 10.7897Z"
            fill="white"
          />
        </svg>
      </summary>
      <div
        ref={contentRef} //Pointe vers la zone de contenu pour mesurer sa hauteur dynamiquement.
        style={{
          // Définir la hauteur en fonction de l'état isOpen
          height: isOpen ? contentRef.current.scrollHeight + "px" : "0px",
          // Cacher le contenu débordant
          overflow: "hidden",
          // Ajouter une transition pour une animation fluide
          transition: "0.3s",
        }}
      >
        {/* Vérifier si le contenu est un tableau */}
        {Array.isArray(content) ? (
          <ul>
            {/* Mapper chaque élément du tableau pour créer une liste */}
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          // Si le contenu n'est pas un tableau, l'afficher comme un paragraphe
          <p>{content}</p>
        )}
      </div>
    </div>
  );
}

// Définition des types de props pour le composant DetailsSection
DetailsSection.propTypes = {
  // Le prop title est requis et doit être une chaîne de caractères
  title: PropTypes.string.isRequired,
  // Le prop content peut être soit une chaîne de caractères, soit un tableau
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

// Exportation du composant DetailsSection
export default DetailsSection;
