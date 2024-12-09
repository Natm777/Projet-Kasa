import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function DetailsSection({ title, content = "Aucun contenu disponible" }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef(null);

  // Synchroniser l'état avec le comportement natif
  useEffect(() => {
    const detailsElement = detailsRef.current;
    if (detailsElement) {
      const handleToggle = () => {
        setIsOpen(detailsElement.open);
      };
      detailsElement.addEventListener("toggle", handleToggle);
      return () => {
        detailsElement.removeEventListener("toggle", handleToggle);
      };
    }
  }, []);

  return (
    <details ref={detailsRef} className={`details-section ${isOpen ? "open" : ""}`}>
      <summary>
        {title}
        <img
          src="/vector.png"
          alt="Flèche"
          className={`details-arrow ${isOpen ? "open" : ""}`}
        />
      </summary>
      {Array.isArray(content) ? (
        <ul>
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </details>
  );
}

DetailsSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default DetailsSection;
