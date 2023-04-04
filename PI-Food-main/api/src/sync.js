// sync.js
const { conn } = require('./db');

conn.sync({ force: true }) // Puedes cambiar 'force: true' por 'alter: true' si no quieres eliminar los datos existentes
  .then(() => {
    console.log('Tablas creadas y sincronizadas');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
    process.exit(1);
  });
