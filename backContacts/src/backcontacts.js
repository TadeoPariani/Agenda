const express = require('express')
const app = express()
const contactosRouter = require('./routes/contactosRouters');
const userRouters = require ('./routes/userRouters')
app.use(express.json())

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgresql://tadeo:admin@localhost:5432/postgres',{
    development: {
        username: 'postgres',
        password: 'mi_password',
        database: 'mi_database',
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