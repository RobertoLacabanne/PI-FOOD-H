require('dotenv').config();

const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false,
  native: false,
  ssl: process.env.DB_SSL || false,
  dialectOptions: process.env.DB_SSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js' && file !== 'relations.js') // Ignorar relations.js aquí
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, 'models', file)));
  });

const models = {}; // Define models aquí

modelDefiners.forEach((modelDefiner, index) => {
  const modelOrModels = modelDefiner(sequelize, Sequelize.DataTypes);
  if (Array.isArray(modelOrModels)) {
    modelOrModels.forEach((model) => {
      if (model && model.name) {
        const modelName = model.name.charAt(0).toUpperCase() + model.name.slice(1);
        models[modelName] = model;
      } else {
        console.error(`Error: No se pudo cargar un modelo desde el archivo "${modelDefiners[index]}"`);
      }
    });
  } else if (modelOrModels && modelOrModels.name) {
    const modelName = modelOrModels.name.charAt(0).toUpperCase() + modelOrModels.name.slice(1);
    models[modelName] = modelOrModels;
  } else {
    console.error(`Error: No se pudo cargar el modelo desde el archivo "${modelDefiners[index]}"`);
  }
});

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
  conn: sequelize,
};
