import React from 'react';
import Card from './Card';

const CardList = ({ recipes }) => {
  return (
    <div className="card-list">
      {recipes.map((recipe) => (
        <Card key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default CardList;

