const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Diet = sequelize.define('Diet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {type: DataTypes.STRING,
    allowNull: false,
    },
    });
    
    module.exports = Diet;