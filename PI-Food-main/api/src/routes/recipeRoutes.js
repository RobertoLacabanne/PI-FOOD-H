const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { getRecipeById, searchRecipes, createRecipe, getAllDiets } = require('../../controllers/recipeControllers');

router.get('/recipes/:idRecipe', getRecipeById);
router.get('/recipes', searchRecipes);

// Agrega validaciones utilizando express-validator como middleware
router.post('/recipes', [
  check('name').notEmpty().withMessage('El nombre es obligatorio'),
  check('summary').notEmpty().withMessage('El resumen es obligatorio'),
  check('healthScore').isInt({ min: 1, max: 100 }).withMessage('El health score debe ser un número entre 1 y 100'),
  // Añade más validaciones aquí según sea necesario
], (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Si no hay errores, continúa con la creación de la receta
  next();
}, createRecipe);

router.get('/diets', getAllDiets);

module.exports = router;


