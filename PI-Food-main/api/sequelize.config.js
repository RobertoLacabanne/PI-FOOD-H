require('dotenv').config();

module.exports = {
  development: {
    config: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'postgres',
    },
  },
  test: {
    config: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'postgres',
    },
  },
  production: {
    config: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'postgres',
    },
  },
  'models-path': 'src/models',
  'seeders-path': 'src/seeders',
  'migrations-path': 'src/migrations',
};
