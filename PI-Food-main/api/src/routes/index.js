const express = require('express');
const router = express.Router();
const recetasRoutes = require('./recetas.routes');
const dietRoutes = require('./diet.routes');

router.use('/recipes', recetasRoutes);
router.use('/diets', dietRoutes);


module.exports = router;
