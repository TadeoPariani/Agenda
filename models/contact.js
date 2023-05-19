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
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    date: DataTypes.STRING,
    favourite: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};