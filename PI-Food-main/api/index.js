const { Sequelize } = require('sequelize');
const { development } = require('./config/config');
const { Recipe, Diet } = require('./models/relations');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const recipeRoutes = require('./routes/recipeRoutes');

const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  dialect: development.dialect,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    await sequelize.sync({ force: false });
    console.log('Los modelos han sido sincronizados con la base de datos.');


  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

// Configurar middleware de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rutas
app.use('/api', recipeRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = sequelize;



