const { sequelize, Sequelize, User} = require ('../../models')
const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
import { hashPass } from "../auth/auth";

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
    // let prueba = hashPass(body.password)
    // res.json({data: prueba})
    bcrypt.hash(body.password, saltRounds, async function(err, hash) {
        if (err){
            res.status(400).json({message: "f"})
        } else {
            body.password = hash
            let newUser = await User.create(body) 
            res.status(200).json({data: newUser})
        }
    })
}

const editUser = async (req, res, next) => {
    let id = req.params.id
    body = req.body
    const existingUser = await User.findByPk(id);
    existingUser.name = body.name
    existingUser.email = body.email
    existingUser.password = body.password
    await bcrypt.hash(existingUser.password, saltRounds, async function(err, hash) {
        if (err){
            res.status(400).json({message: "f"})
        } else {
            existingUser.password = hash
            await existingUser.save()
            res.status(200).json({data: existingUser})
        }
    })
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
    const existingUser = await User.findByPk(id);
    if (existingUser){
        next()
    }else{
        return res.status(400).json({ message: 'User doesnt exists'});
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