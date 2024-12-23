import React from "react";

function Starsmobile({ stars }) {
  return (
    <div className="stars-mobile">
      {stars.map((star, index) => (
        <img
          key={index}
          src={star === "fa-solid fa-star" ? "/vector_2.png" : "/vector_empty.png"} 
          alt="Étoile"
          className="star-icon"
        />
      ))}
    </div>
  );
}

export default Starsmobile;