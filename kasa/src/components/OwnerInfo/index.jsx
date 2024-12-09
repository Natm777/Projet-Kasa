import React from "react";

function OwnerInfo({ hostName, hostPicture }) {
  return (
    <div className="owner-info">
      <h2 className="owner-name">{hostName}</h2>
      <img className="owner-picture" src={hostPicture} alt={hostName} />
    </div>
  );
}

export default OwnerInfo;


