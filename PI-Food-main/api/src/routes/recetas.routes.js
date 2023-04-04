const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/ControllerRecipe');

router.get('/', recipesController.recipes);

module.exports = router;
