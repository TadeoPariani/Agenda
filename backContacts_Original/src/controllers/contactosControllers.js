const express = require('express');
const router = express.Router();

let Contactos = {
    "contacts": [
    {
    "id": 1,
    "date": "2019-05-30T19:20:14.298Z",
    "favourite": true,
    "name":"juan",
    "phone":"66666666"
    },
    {
    "id": 2,
    "date": "2019-05-30T19:20:14.298Z",
    "favourite": true,
    "name":"maria",
    "phone":"76767676"
    },
    {
    "id": 3,
    "date": "2019-05-30T19:20:14.298Z",
    "favourite": true,
    "name":"roberto",
    "phone":"76767676"
    },
    {
    "id": 4,
    "date": "2019-05-30T19:20:14.298Z",
    "favourite": true,
    "name":"juana",
    "phone":"76767676"
    },
    {
    "id": 5,
    "date": "2019-05-30T19:20:14.298Z",
    "favourite": true,
    "name":"fede",
    "phone":"76767676"
    }
    ]
}

let listaIds = [1,2,3,4,5];

const getContactos = (req, res, next) => {
    res.json({message:"Todos los contactos", contactos: Contactos.contacts});
}

const verificationId = (req, res, next) => {
    let id = Number(req.params.id)
    let idBody = req.body.id
    if (listaIds.includes(id) || listaIds.includes(idBody)) {
        console.log("verificacion: ", listaIds)
        next()
    }
    else{
        res.status(400).json({message:"Contacto no Encontrado"})
    }
}

const getContacto = (req, res, next) => {
    let id = req.params.id
    Contactos.contacts.forEach(function (contact) {
        if (id == contact.id) {
            res.status(200).json({message:"Contacto Encontrado", contact});
        }
    })
}

const deleteContacto =  (req, res, next) => {
    let id = Number(req.params.id)
    Contactos.contacts.forEach(function (contact) {
        if (id == contact.id) {
            let contactIndex = Contactos.contacts.indexOf(contact);
            listaIds.splice(id-1, 1)
            console.log("despues del splice: ", listaIds)
            if (contactIndex > -1) {
                Contactos.contacts.splice(contactIndex, 1)
                res.status(200).json({message: "CONTACTO ELIMINADO", contactos: Contactos.contacts});
            }
        }
    })
}

const postContacto = (req, res, next) => {
    let ultimoContacto = Contactos.contacts[Contactos.contacts.length - 1]
    let body = req.body
    let nuevoContactoId = ultimoContacto.id + 1 
    

    let nuevoContacto = {

        id: nuevoContactoId,
        date: body.date,
        favourite: body.favourite,
        name: body.name,
        phone: body.phone

    }
    listaIds.push(nuevoContactoId);
    Contactos.contacts.push(nuevoContacto)
    res.json({Contactos: Contactos.contacts})
    
}

const editContacto = (req, res, next) => {
    let body = req.body
    Contactos.contacts.forEach(function (contact) {
        if (body.id == contact.id) {
            contactIndex = Contactos.contacts.indexOf(contact);
            contact.date = body.date
            contact.favourite = body.favourite
            contact.name = body.name
            contact.phone = body.phone
            res.status(200).json({Contactos_Editados: Contactos.contacts})
        }
    }) 
}

module.exports = {
    getContactos,
    verificationId,
    getContacto,
    deleteContacto,
    postContacto,
    editContacto
}