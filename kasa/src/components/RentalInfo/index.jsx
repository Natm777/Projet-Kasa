import React from "react";

function RentalInfo({ title, location }) {
  return (
    <div className="rental-info">
      <h1 className="rental-title">{title}</h1>
      <p className="rental-location">{location}</p>
    </div>
  );
}

export default RentalInfo;