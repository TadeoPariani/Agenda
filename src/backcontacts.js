const express = require('express')
const app = express()
const contactosRouter = require('./routes/contactosRouters');
const userRouters = require ('./routes/userRouters')
app.use(express.json())

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5434/postgres',{
    development: {
        username: 'postgres',
        password: 'postgres',
        database: 'agenda_db',
        host: 'db-1',
        dialect: 'postgres'
    }
})

sequelize.authenticate()

app.use('/contactos', contactosRouter);
app.use('/contactos/:id', contactosRouter);
app.use('/user', userRouters)

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})