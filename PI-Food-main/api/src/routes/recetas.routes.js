//recetas.routes.js

const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const axios = require('axios');
const router = Router();
const model = require('../controllers/ControllerRecipe');
const { recipes } = require('../controllers/RecetasApi');

// Listar todas las recetas y buscar por nombre
router.get('/', async (req, res) => {
  const name = req.query.name;
  let recipeTotal = await model.getDbinfo();
  if (name) {
    let recipeName = await recipeTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toString().toLowerCase())
    );
    recipeName.length
      ? res.status(200).send(recipeName)
      : res
          .status(404)
          .send(
            'No existe Receta que contenga ese Nombre: ' + name.toLowerCase()
          );
  } else {
    res.status(200).send(recipeTotal);
  }
});

// Buscar recetas por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let recipeTotal = await model.getDbinfo();

  if (id) {
    let recipeId = await recipeTotal.filter((el) => el.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(404).send('No se Encontro Receta con el id: ' + id);
  }
});

// Agregar una nueva receta
router.post('/', async (req, res) => {
  const { name, summary, healthScore, stepbyStep, image, createIndb, diet } = req.body;
  if (!name || !summary) {
    res.status(404).send('las Dtos name y summary son requeridos');
  } else {
    try {
      const stepsArray = Array.isArray(stepbyStep) ? stepbyStep : [];

      let recipeCreated = await Recipe.create({
        name,
        summary,
        healthScore,
        stepbyStep: stepsArray.length ? stepsArray : [''], // Asegúrate de que stepbyStep es un array, si está vacío, usa un array con un elemento vacío
        image,
        createIndb,
      });
      
      
      console.log('Receta creada:', recipeCreated);

      // Buscar todas las dietas en la base de datos y agregarlas al modelo Recipe
      const dietsArray = Array.isArray(diet) ? diet : [];

      for (const dietName of dietsArray) {
        const dietDb = await Diet.findOne({ where: { name: dietName } });
        if (dietDb) {
          await recipeCreated.addDiet(dietDb);
        }
      }

      res.send('Receta creada con éxito');
    } catch (error) {
      console.error('Error:', error);
      res.status(404).send(error + 'Error al crear la receta');
    }
  }
});



module.exports = router;
