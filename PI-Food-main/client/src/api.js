// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';



export const searchRecipesByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/recipes`, {

      params: {
        name: name,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error buscando recetas:', error);
    return [];
  }
};

