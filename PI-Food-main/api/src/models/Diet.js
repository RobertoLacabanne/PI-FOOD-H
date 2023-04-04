const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Diet = sequelize.define(
  'diet',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Asocia Diet con Recipe
Diet.associate = (models) => {
  Diet.belongsToMany(models.Recipe, { through: 'RecipeDiet' });
};

module.exports = Diet;
