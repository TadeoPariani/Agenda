const express = require('express');
const router = express.Router();
const { login,verificationId,schemaLogin } = require('../auth/auth');
const Joi = require('joi')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { sequelize, Sequelize, User} = require ('../../models')
//import jwt_decode from "jwt-decode";

const {
  
   getUsers,
   getUser,
   editUser,
   deleteUser,
   addUser

} = require('../controllers/userControllers')

let authToken;
const attachToken = (req, res, next) => {
  try{
    const cookie = req.headers.cookie;
    //console.log('TODOS LOS HEADERS ----->', req.headers);
    if (cookie) {
      const cookies = cookie.split(';');
      for (const c of cookies) {
        const [key, value] = c.trim().split('=');
        if (key === 'auth-token') {
          const tokenValue = decodeURIComponent(value);
          const startIndex = tokenValue.indexOf('{'); // Índice del primer '{'
          authToken = JSON.parse(tokenValue.slice(startIndex)); // Eliminar el prefijo "j:" y analizar JSON
          break;
        }
      }
      console.log('VALOR DE LA COOKIE ->', authToken);
    }
    
    next();
    return authToken
  }catch{
    res.status(400).json({ Status: "Wrong password, try again" });
  }
};

router.post('/login', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const admin = await User.findByPk(2);
    bcrypt.compare(password, admin.password, async function (err, result) {
      if (result === true) {
        let payload = {
          name: name,
          email: email,
          password: password
        };
        const token = jwt.sign(payload, process.env.CLAVE_TOKEN, { expiresIn: "1h" });
      
        res.cookie('auth-token',{ 'auth-token': token });

        res.header('auth-token', token).json({
          message:'Session successfully started',
          data: {token}
      })
        
        
      } else {
        res.status(400).json({ Status: "Wrong password, try again" });
      }
    });
  } catch (error) {
    next(error);
  }
});

router.use(attachToken)

//MIDDLEWARE PARA VALIDAD EL TOKEN QUE SE ENVIEN POR RUTAS
const verifyToken = (req, res, next) => {
  //let authToken = attachToken(req, res, next )
  console.log('VALOR DE AUTHTOKEN CON LA FUNCION ',authToken)
  try {const token =authToken['auth-token']; 
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
    const decoded = jwt.verify(token, process.env.CLAVE_TOKEN); 
    //console.log('VALOR DEL TOKEN DECODIFICADO', decoded);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};


router.get('/logout', (req, res) => {
  res.clearCookie('auth-token'); // Elimina la cookie 'auth-token'
  authToken = undefined
  res.json({ message: 'Logged out successfully' });
  
});

router.get('/',attachToken,verifyToken ,getUsers)

router.get('/:id', verificationId, getUser)

router.post('/', addUser)

router.put('/:id', verificationId, editUser)

router.delete('/:id', verificationId, deleteUser)

module.exports = router;