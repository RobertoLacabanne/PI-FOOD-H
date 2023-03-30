const { Recipe, Diet } = require('../models/relations');
const axios = require('axios');
const apiKey = 'fd7bb8b3145c48c086f8ea949accbefe';
const { Op } = require('sequelize');


const getRecipeById = async (req, res) => {
    const { idRecipe } = req.params;
    try {
      // Buscar en la base de datos
      const recipeDb = await Recipe.findOne({ where: { id: idRecipe }, include: Diet });
  
      if (recipeDb) {
        return res.json(recipeDb);
      }
  
      // Buscar en la API de Spoonacular
      const response = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${apiKey}`);
  
      if (response.data) {
        const recipe = {
          id: response.data.id,
          name: response.data.title,
          image: response.data.image,
          summary: response.data.summary,
          healthScore: response.data.healthScore,
          stepByStep: response.data.instructions,
          diets: response.data.diets, 
        };
        return res.json(recipe);
      }
    } catch (error) {
      res.status(404).json({ message: 'Receta no encontrada' });
    }
  };

  const searchRecipes = async (req, res) => {
    const { name } = req.query;
  
    try {
      // Buscar en la base de datos
      const recipesDb = await Recipe.findAll({ where: { name: { [Op.iLike]: `%${name}%` } }, include: Diet });
  
      // Buscar en la API de Spoonacular
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${name}&number=10`);
  
      const recipesApi = response.data.results.map(recipe => ({
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
      }));
  
      // Combinar resultados
      const recipes = [...recipesDb, ...recipesApi];
  
      if (recipes.length > 0) {
        return res.json(recipes);
      } else {
        return res.status(404).json({ message: 'No se encontraron recetas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar recetas' });
    }
  };
  

  const createRecipe = async (req, res) => {
    const { name, image, summary, healthScore, stepByStep, dietIds } = req.body;
  
    try {
      const newRecipe = await Recipe.create({ name, image, summary, healthScore, stepByStep });
  
      await newRecipe.setDiets(dietIds);
  
      return res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la receta' });
    }
  };
  

  const getAllDiets = async (req, res) => {
    try {
      // Consultar la base de datos
      let diets = await Diet.findAll();
  
      // Si no hay dietas en la base de datos
      if (diets.length === 0) {
        // Consultar la API de Spoonacular
        const response = await axios.get(`https://api.spoonacular.com/recipes/diets?apiKey=${apiKey}`);
  
        const dietsToCreate = response.data.map(diet => ({ name: diet }));
  
        // Crear las dietas en la base de datos
        diets = await Diet.bulkCreate(dietsToCreate);
      }
  
      res.json(diets);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las dietas.' });
    }
  };
  
  

module.exports = {
  getRecipeById,
  searchRecipes,
  createRecipe,
  getAllDiets,
};
