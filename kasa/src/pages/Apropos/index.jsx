import React from "react";
import Banner from "../../components/Banner";
import DetailsSection from "../../components/DetailsSection"; // Import du composant
import { aboutList } from "../../data/aboutList"; // Import du tableau d'infos

function APropos() {
  return (
    <div className="apropospage">
      {/* Bannière pour la page A Propos */}
      <Banner imageSrc="/image_2.png" className="apropos-banner" />

      {/* Section des détails */}
      <section className="about-details">
        {aboutList.map((item, index) => (
          <DetailsSection key={index} title={item.title} content={item.content} />
        ))}
      </section>
    </div>
  );
}

export default APropos;
