const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const contactRoutes = require('./src/routes/contactRoutes');
const userRouters = require('./src/routes/userRouters');

app.use(express.json());

const sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5434/postgres', {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'agenda_db',
    host: 'db-1',
    dialect: 'postgres'
  }
});

sequelize.authenticate();


app.use('/contact', contactRoutes);
app.use('/user', userRouters);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
