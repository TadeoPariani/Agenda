const express = require('express');

const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verificationId, schemaLogin } = require('../auth/auth');
require('dotenv').config();
const { sequelize, Sequelize, User } = require('../../models');

const { attachToken, verifyToken } = require('../auth/authLogin');

const {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  addUser
} = require('../controllers/userControllers');

// let authToken;

router.post('/login', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const admin = await User.findByPk(3);
    bcrypt.compare(password, admin.password, async function (err, result) {
      if (result === true) {
        const payload = {
          name: name,
          email: email,
          password: password
        };
        const token = jwt.sign(payload, process.env.CLAVE_TOKEN, { expiresIn: '1h' });
        res.cookie('auth-token', { 'auth-token': token });
        res.header('auth-token', token).json({
          message: 'Session successfully started',
          data: { token }
        });
      }
      else {
        res.status(400).json({ Status: 'Wrong password, try again' });
      }
    });
  }
  catch (error) {
    next(error);
  }
});

router.use(attachToken);

router.get('/logout', (req, res) => {
  res.clearCookie('auth-token'); // Elimina la cookie 'auth-token'
  res.json({ message: 'Logged out successfully' });
});

router.get('/', getUsers);

router.get('/:id', attachToken, verifyToken, verificationId, getUser);

router.post('/', attachToken, verifyToken, addUser);

router.put('/:id', attachToken, verifyToken, verificationId, editUser);

router.delete('/:id', attachToken, verifyToken, verificationId, deleteUser);

module.exports = router;
