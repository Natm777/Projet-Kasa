import React from "react";
import { Link } from "react-router-dom";

function Card({ id, cover, title }) {
  return (
    <Link to={`/logement/${id}`} className="card">
      <img src={cover} alt={title} className="card__img" />
      <h2 className="card__title">{title}</h2>
    </Link>
  );
}

export default Card;