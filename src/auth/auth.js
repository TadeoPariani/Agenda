import { json } from 'sequelize';
const bcrypt = require('bcrypt');
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const express = require('express');
const { sequelize, Sequelize, User} = require ('../../models')
require('dotenv').config()

export async function hashPass(body) {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(body, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const contactSchema = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).required()
        .messages({
            'string.pattern.base': 'The name cannot contain numbers or special characters'
        }),
  lastname: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).required()
        .messages({
            'string.pattern.base': 'The lastname cannot contain numbers or special characters'
        }),
  phone: Joi.string().pattern(new RegExp('^[0-9]+$')).required()
        .messages({
            'string.pattern.base': 'The phone number can only be made up of numbers'
        }),
  favourite: Joi.boolean().optional(),
});

export const userSchema = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(3).required()
        .messages({
            'string.pattern.base': 'The name cannot contain numbers or special characters'
        }),
  email: Joi.string().min(3).email().required()
        .messages({
            'string.pattern.base': 'The phone number can only be made up of numbers'
        }),
  password: Joi.string().min(3).max(30).required()
  .messages({
      'string.pattern.base': ''
  })
});

function generateToken(body) {
  let payload = {
    'name': body.name,
    'email': body.email,
    'password': body.password
  }
  let algorithm = 'HS256'
  let token = jwt.sign(payload, process.env.CLAVE_SECRETA,{expiresIn: "1h",})
  return token
}

export async function verifyToken(token) {
  try {
    const decoded = await jwt.verify(token, process.env.CLAVE_SECRETA);
    return decoded;
  } catch (error) {
    console.log('Error al verificar el token:', error.message);
    return null;
  }
}

export function verifyLogin(token){
  console.log(token, "---------------------------------")
  if(token != undefined){
    console.log("------------------------------------------------------")
    return true
  }
}

export const login = async (req, res, next) => {
  let headers = req.headers
  let body = req.body
  const admin = await User.findByPk(3);
  bcrypt.compare(headers.adminpassword, admin.password, async function(err, result){
      if (result == true) {
        let generatedToken = generateToken(body)
        console.log(generatedToken)
        res.locals.token = generatedToken
        next()
      } else {
          res.status(400).json({Status: "Wrong password, try again"})
      }
    }
  )
}

export const verificationId = async (req, res, next) => {
  let id = req.params.id
  try{
      const existingUser = await User.findByPk(id);
      if (existingUser){
          next()
      }else{
        res.status(400).json({ error: 'User doesnt exists' });
      }
  }
  catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
}
