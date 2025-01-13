import React from "react";
import Banner from "../../components/Banner";
import DetailsSection from "../../components/DetailsSection"; // Import du composant
import { aboutList } from "../../data/aboutList"; // Import du tableau d'infos

function APropos() {
  return (
    <div className="apropospage">
      {/* Bannière pour la page A Propos */}
      <Banner
        imageSrc="https://s3-alpha-sig.figma.com/img/56fa/e17e/b9995860bb6384a77ca7dc9bf52da3be?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ACoa1Va0JpxBwdhmLB3WkfX2VpKSPnxjrLMe4-IGwe2E~UOAalmBd0xIpHQP7mp0brDqCg5g~ySIrTQ2GzOfAZc9-WyLv1GqKOfBgny3sFjrITaygI9GA5zs8qnAbw6OoxCULB7qkLKyYhP-KXnDlpJBRHvmkLEdshoVdichnDcVKPExc~MlZx1MD4Cir6PP8wgJmD-a8Q1O~Yz9ARILQ2IyVnqQhwjA1yfrcUD6~g0Fvp~JYhifGC2gSGDHAFYb4Ifj2LILhBH9X9QO2fpgWehPzWpYbZjLCIPB2D~YSfpp1O8WNpsBGXgMjGdmwhByIk6UaH8eFQvVw-abcak1Vw"
      />

      {/* Section des détails */}
      <section className="about-details">
        {aboutList.map((item, index) => (
          <DetailsSection
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </section>
    </div>
  );
}

export default APropos;
