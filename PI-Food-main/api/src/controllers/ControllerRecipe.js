const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');

/* Obtengo las recetas de la Api */
const getApiInfo = async () => {
  try {
    const lengthdata = await Recipe.findAll();
    if (lengthdata.length < 100) {
      const urlApi = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      );
      if (Array.isArray(urlApi.data.results)) {
        await Promise.all(
          urlApi.data.results.map(async (el) => {
            let recipeCreated = await Recipe.create({
              name: el.title,
              summary: el.summary,
              healthScore: el.healthScore,
              stepbyStep: el.analyzedInstructions[0]?.steps.map((paso) => {
                return `<b>${paso.number}</b>   ${paso.step}  `;
              }),
              image: el.image,
            });
            let dietDb = await Diet.findAll({
              where: {
                name: el.diets,
              },
            });
            recipeCreated.addDiet(dietDb);
          })
        );
      } else {
        console.error('urlApi.data.results no es un array');
      }
    } else {
      console.log('los datos de recetas ya estan cargados 202');
    }
  } catch (error) {
    console.error('Error al obtener recetas de la API:', error);
  }
};

/* Obtengo los Datos de la base de Datos */
const getDbinfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      atrributes: ['name'],
      through: {
        atrributes: ['id', 'name'],
      },
    },
  });
};
const getRecipeByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    if (!name) {
      res.status(400).send('Debe proporcionar un nombre de receta.');
    } else {
      const recipes = await Recipe.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      if (recipes.length > 0) {
        res.status(200).send(recipes);
      } else {
        res.status(404).send('No se encontraron recetas con ese nombre.');
      }
    }
  } catch (error) {
    next(error);
  }
};

/* Combino la infromacion de la App y la de la DB */

module.exports = {
  getDbinfo,
  getApiInfo,
  getRecipeByName,
};
