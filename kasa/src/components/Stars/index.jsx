import React from "react";

function Stars({ stars }) {
  return (
    <div className="stars">
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

export default Stars;
