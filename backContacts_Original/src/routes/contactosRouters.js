const express = require('express');
const router = express.Router();
const app = express()
const {

    getContactos,
    verificationId,
    getContacto,
    deleteContacto,
    postContacto,
    editContacto

} = require('../controllers/contactosControllers')




router.get('/', getContactos, (req, res) => {
});

router.get('/:id', verificationId, getContacto, (req, res) => {
});

router.delete('/:id', verificationId, deleteContacto, (req, res) => {
})

router.post('/',  postContacto, (req, res) => {
})

router.put("/", verificationId, editContacto, (req, res) => {
})

module.exports = router;

