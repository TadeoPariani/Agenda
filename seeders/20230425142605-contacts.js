/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Tadeo',
        email: 'tadeo@gmail.com',
        password: '$2b$10$rZQWzXXo0YxuHEm9hUKbAO4JzNYxBolZcmbf3sdYDMe7q30TEdpu.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
