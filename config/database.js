const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5434/agenda_db', {
  dialect: 'postgres'
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } };


module.exports = { sq: sequelize, testDbConnection };