'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
  await queryInterface.bulkInsert('Contacts', [
    {
    name: 'John Doe',
    phone: "12345678",
    date: "2002-08-12",
    favourite: "true",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Juan Perez',
    phone: "12343214",
    date: "2012-03-03",
    favourite: "true",
    createdAt: new Date(),
    updatedAt: new Date()
  }
], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {});
  }
};
