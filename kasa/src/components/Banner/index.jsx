import React from "react";

// Composant Banner qui accepte des props : imageSrc et text 
function Banner({ imageSrc, text}) {
  return (
    <div className="banner">
      {/* Afficher l'image de la bannière */}
      <img src={imageSrc} alt="Bannière" className="banner-image" />
      {/* Afficher le texte s'il est fourni */}
      {text && <h1 className="banner-text">{text}</h1>}
    </div>
  );
}

export default Banner;