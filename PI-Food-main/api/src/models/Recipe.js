const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  healthScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stepByStep: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Recipe;
