const Sequelize = require('sequelize');

<<<<<<< Updated upstream
const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5434/agenda_db', {
=======
const sequelize = new Sequelize('jdbc:postgresql://localhost:5434/postgres', 'postgres', 'postgres', {
  host: 'db-1',
>>>>>>> Stashed changes
  dialect: 'postgres'
});

const testDbConnection = async () => {
<<<<<<< Updated upstream
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
=======
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } };
>>>>>>> Stashed changes

module.exports = { sq: sequelize, testDbConnection };