const { sequelize, Sequelize, Contact, User} = require ('../../models')
const express = require('express');
const bcrypt = require('bcrypt');

// Ver todos los contactos
const getContacts = async (req, res, next) => {
    const allContacts  = await Contact.findAll({})
    res.json({message:"All your contacts", data: allContacts});
}

// Obtener un contacto especifico
const getContact = async (req, res, next) => {
    let id = req.params.id
    const existingContact = await Contact.findByPk(id);
    res.status(200).json({Message: `Contact: ${existingContact.name}`, data: existingContact})
}

// Crear un contacto
const addContact = async (req, res, next) => {
    let body = req.body
    delete body.adminPassword
    let newContact = await Contact.create(body)
    res.status(201).json({Logged: "You are logged", Message: "Contact Added", data: newContact})
}

// Editar un contacto
const editContact = async (req, res, next) => {
    let id = req.params.id
    let body = req.body
    const existingContact = await Contact.findByPk(id);
    existingContact.name = body.name
    existingContact.phone = body.phone
    existingContact.date = body.date
    existingContact.favourite = body.favourite
    await existingContact.save()
    res.status(200).json({Message: `Contact: ${existingContact.name}`, data: existingContact})
}

//Borrar un contacto
const deleteContact = async (req, res, next) => {
    let id = req.params.id
    const existingContact = await Contact.findByPk(id);
    await existingContact.destroy({
        where: {
          id: id
        }
    });
    const ContactsDb  = await Contact.findAll({})
    res.status(200).json({Message: 'Contact deleted', data: ContactsDb})
}

// Se verifica que el id del contacto a buscar/borrar/editar exista
const verificationId = async (req, res, next) => {
    let id = req.params.id
    const existingContact = await Contact.findByPk(id);
    if (existingContact){
        next()
    }else{
        return res.status(400).json({ message: 'Contact doesnt exists'});
    }
}

// login
const login = async (req, res, next) => {
    let body = req.body
    const admin = await User.findByPk(4);
    bcrypt.compare(body.adminPassword, admin.password, async function(err, result){
        if (result == true) {
            next()
        } else {
            res.status(400).json({Logged: "Wrong password, try again"})
        }
    })
}

module.exports = {
    getContacts,
    getContact,
    deleteContact,
    addContact,
    editContact,
    verificationId,
    login
}