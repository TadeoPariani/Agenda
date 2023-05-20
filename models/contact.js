'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
    }
  }
  Contact.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
          type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleDateString('es-ES')
      },
    favourite: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};