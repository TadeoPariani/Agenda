const bcrypt = require('bcrypt');
const express = require('express');
const { sequelize, Sequelize, User} = require ('../../models')


const login = async (req, res, next) => {
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
    login,
    verificationId
}
  
  