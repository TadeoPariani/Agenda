const express = require('express')
const app = express()
const contactosRouter = require('./routes/contactosRouters');
app.use(express.json())

// hola buenos dias

app.use('/contactos', contactosRouter);
app.use('/contactos/:id', contactosRouter);
// app.use('/contactos', contactosRouter);

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})