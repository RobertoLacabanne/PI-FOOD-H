
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export async function searchRecipesByName(name) {
  try {
    const response = await axios.get(`${API_URL}/recipes?name=${name}`);
    return response.data;
  } catch (error) {
    console.error('Error buscando recetas:', error);
    throw error;
  }
}


