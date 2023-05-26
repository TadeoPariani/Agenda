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
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
          type: DataTypes.STRING,
        allowNull: false
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