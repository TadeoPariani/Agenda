const express = require('express');

const router = express.Router();
const app = express();

const { getContacts, getContactbyID, addContact, deleteContact, editContact, getFavouritesContacts, getContactbyName, getContactbyLastName } = require('../controllers/contactControllers');

router.use(express.json());

router.get('/', getContacts, (req, res) => {});

router.get('/favourites', getFavouritesContacts, (req, res) => {});

router.get('/search_name', getContactbyName, (req, res) => {});

router.get('/search_lastname', getContactbyLastName, (req, res) => {});

router.get('/:id', getContactbyID, (req, res) => {});

router.post('/', addContact, (req, res) => {});

router.delete('/:id', deleteContact, (req, res) => {});

router.put('/:id', editContact, (req, res) => {});

module.exports = router;
