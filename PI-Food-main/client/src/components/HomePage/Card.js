import React from 'react';
import './Card.css'; // Importa el archivo de estilos correspondiente (si es necesario)

const Card = ({ recipe }) => {
  const { id, name, image, diets } = recipe;

  return (
    <div className="card">
      <img src={image} alt={`${name} image`} className="card-img" />
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <ul className="card-diets">
          {diets.map((diet, index) => (
            <li key={index}>{diet}</li>
          ))}
        </ul>
      </div>
      <a href={`/recipe/${id}`} className="card-details-link">
        Ver detalles
      </a>
    </div>
  );
};

export default Card;
