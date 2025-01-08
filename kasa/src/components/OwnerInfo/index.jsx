import React from "react";

function OwnerInfo({ hostName, hostPicture }) {
  // Diviser le nom et le prénom
  const [firstName, lastName] = hostName ? hostName.split(" ") : ["", ""];

  return (
    <div className="owner-info">
      <div className="owner-name">
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>
      <img className="owner-picture" src={hostPicture} alt={`${hostName}`} />
    </div>
  );
}

export default OwnerInfo;