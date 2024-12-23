import React from "react";

function Owner({ hostName, hostPicture }) {
  if (!hostName || !hostPicture) return null; // Vérifie si les données sont présentes

  // Sépare le nom en deux lignes
  const [firstName, lastName] = hostName.split(" ");

  return (
    <div className="owner-info-mobile">
      <h2 className="owner-name-mobile">
        <span>{firstName}</span>
        <br />
        <span>{lastName}</span>
      </h2>
      <img
        className="owner-picture-mobile"
        src={hostPicture}
        alt={hostName}
      />
    </div>
  );
}

export default Owner;
