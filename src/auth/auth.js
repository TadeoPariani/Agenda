import { json } from 'sequelize';
const bcrypt = require('bcrypt');
const Joi = require('joi')
const express = require('express');
const { sequelize, Sequelize, User} = require ('../../models')

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

export const login = async (req, res, next) => {
  let headers = req.headers
  const admin = await User.findByPk(3);
  bcrypt.compare(headers.adminpassword, admin.password, async function(err, result){
      if (result == true) {
          next()
      } else {
          res.status(400).json({Status: "Wrong password, try again"})
      }
  })
}

export const verificationId = async (req, res, next) => {
  let id = req.params.id
  try{
      const existingUser = await User.findByPk(id);
      res,json({dd: existingUser})
      if (existingUser){
          next()
      }else{
        res.status(200).json({ error: 'User doesnt exists' });
      }
  }
  catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
}
