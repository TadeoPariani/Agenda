const express = require('express');
const app = express();

const contactRoutes = require('./src/routes/contactRoutes');

app.use('/contact', contactRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});