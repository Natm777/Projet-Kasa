import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function DetailsSection({ title, content = "Aucun contenu disponible" }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef(null);
  const contentRef = useRef(null);

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
    <details
      ref={detailsRef}
      className={`details-section ${isOpen ? "open" : ""}`}
    >
      <summary>
        {title}
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
     
      <div ref={contentRef} style={{
        height: isOpen ? contentRef.current.scrollHeight+'px' : '0px',
        overflow: "hidden",
        transition: "0.3s",
      }}>
        
      {Array.isArray(content) ? (
        <ul>
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </div>

    </details>
  );
}

DetailsSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default DetailsSection;
