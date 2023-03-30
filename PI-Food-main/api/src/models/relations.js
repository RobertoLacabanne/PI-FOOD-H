const Recipe = require('./Recipe');
const Diet = require('./Diet');

// Establecer la relación de muchos a muchos entre Recipe y Diet
Recipe.belongsToMany(Diet, { through: 'RecipeDiet' });
Diet.belongsToMany(Recipe, { through: 'RecipeDiet' });

module.exports = {
  Recipe,
  Diet,
};