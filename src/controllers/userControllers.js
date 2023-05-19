const { sequelize, Sequelize, User} = require ('../../models')
const express = require('express');
const Joi = require('joi')
const bcrypt = require('bcrypt');
const saltRounds = 10;
import { hashPass } from "../auth/auth";


const userSchema = Joi.object({
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

const getUsers = async (req, res, next) => {
    const allUsers = await User.findAll({})
    res.json({message:"All your users", data: allUsers});
}

const getUser = async (req, res, next) => {
    let id = req.params.id
    const existingUser = await User.findByPk(id);
    res.status(200).json({Message: `Contact: ${existingUser.name}`, data: existingUser})
}

const addUser = async (req, res, next) => {
    let body = req.body
    try {
        const validatedData = await userSchema.validateAsync(body);
        // const newContact = await User.create(validatedData);
        res.status(201).json({
          message: 'New contact has been created successfully',
          data: validatedData,
        });
      } catch (err) {
        if (err.details) {
          res.status(400).json({ error: err.details[0].message });
        } else {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
    }
};

const editUser = async (req, res, next) => {
    let id = req.params.id
    let body = req.body

    try {
        const validatedData = await userSchema.validateAsync(body);
        res.status(201).json({
            message: 'New contact has been created successfully',
            data: validatedData,
        });
        // const existingUser = await User.findByPk(id);
        // existingUser.name = body.name
        // existingUser.email = body.email
        // existingUser.password = body.password
        // await bcrypt.hash(existingUser.password, saltRounds, async function(err, hash) {
        //     if (err){
        //         res.status(400).json({message: "f"})
        //     } else {
        //         existingUser.password = hash
        //         await existingUser.save()
        //         res.status(200).json({data: existingUser})
        //     }
        // })
    } catch (err) {
        if (err.details) {
          res.status(400).json({ error: err.details[0].message });
        } else {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
    }
}  

const deleteUser = async (req, res, next) => {
    let id = req.params.id
    const existingUser = await User.findByPk(id);
    await existingUser.destroy({
        where: {
          id: id
        }
    });
    const UsersDb  = await User.findAll({})
    res.status(200).json({Message: 'User deleted', data: UsersDb})
}

// Se verifica que el id del usuario a buscar/borrar/editar exista
const verificationId = async (req, res, next) => {
    let id = req.params.id
    try{
        const existingUser = await User.findByPk(id);
        if (existingUser){
            next()
        }
    }
    catch (err) {
        res.status(200).json({ error: 'user doesnt exists' });
    }
}

module.exports = {
    getUsers,
    getUser,
    editUser,
    deleteUser,
    addUser,
    verificationId
}