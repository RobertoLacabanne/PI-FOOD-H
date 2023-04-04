const axios = require('axios');
const { Recipe, Diet } = require('../db');

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

const getApiInfo = async () => {
  const lengthdata = await Recipe.findAll();
  if (lengthdata.length < 100) {
    const urlApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );

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
        let diets = await Diet.findAll({
          where: {
            name: el.diets,
          },
        });
        recipeCreated.addDiets(diets);
      })
    );
  } else {
    console.log('los datos de recetas ya estan cargados 202');
  }
};

const getDbinfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: ['id', 'name'],
      },
    },
  });
};

const recipes = async (req, res) => {
  try {
    const { name } = req.query;
    let recipes = [];

    if (!name) {
      recipes = await getDbinfo();
    } else {
      recipes = await Recipe.findAll({
        where: {
          name: name,
        },
        include: {
          model: Diet,
          attributes: ['name'],
          through: {
            attributes: ['id', 'name'],
          },
        },
      });
    }

    if (recipes.length === 0) {
      res.status(404).send({ message: 'Receta no encontrada' });
    } else {
      res.send(recipes);
    }
  } catch (error) {
    console.error('Error en la función recipes:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

const diet = async () => {
  const lengthdata = await Diet.findOne({ where: { id: 1 } });
  if (!lengthdata) {
    const dietApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const diets = dietApi.data.results.map((el) => el.diets);
    const flatDiets = diets.flat();
    const uniqueDiets = [...new Set(flatDiets)];

    await Promise.all(
      uniqueDiets.map(async (el) => {
        await Diet.findOrCreate({
          where: { name: el },
        });
      })
    );
    console.log('me ha ejecutado ' + uniqueDiets.length + ' veces');
  } else {
    console.log('los datos de dietas ya estan cargados');
  }
};

module.exports = {
  getDbinfo,
  getApiInfo,
  recipes,
  diet,
};
