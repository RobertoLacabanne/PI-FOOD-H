import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailPage = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>ID: {recipe.id}</p>
      <p>Resumen del plato: {recipe.summary}</p>
      <p>Nivel de comida saludable (health score): {recipe.healthScore}</p>
      <p>Paso a paso:</p>
      <ul>
        {recipe.stepByStep.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <img src={recipe.image} alt={recipe.name} />
      <p>Tipos de dieta:</p>
      <ul>
        {recipe.diets.map((diet) => (
          <li key={diet.id}>{diet.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetailPage;
