'use strict';

const { QueryInterface } = require('sequelize');
const { Contact } = require('../models'); // Importar el modelo Contact

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Contacts','date', {
      date: {
        type: Sequelize.STRING,
        defaultValue: new Date().toLocaleDateString('es-ES')
      },
    });
  },
};
