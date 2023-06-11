const express = require('express');

const router = express.Router();
const Joi = require('joi');
const { sequelize, Sequelize, Contact } = require('../../models');
const { contactSchema } = require('../auth/auth');

// View all contacts
const getContacts = async (req, res, next) => {
  try {
    const viewAllContacts = await Contact.findAll({});
    if (viewAllContacts.length === 0) {
      res.status(204).json({
        message: 'Your contact book is empty'
      });
    }
    else {
      res.status(200).json({
        message: 'Here are all your available Contacts',
        data: viewAllContacts
      });
    }
  }
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// View a single contact by id
const getContactbyID = async (req, res, next) => {
  try {
    const viewContact = await Contact.findOne({ where: { id: req.params.id } });
    res.status(200).json(
      {
        message: 'Here is your Contact',
        data: viewContact
      }
    );
  }
  catch {
    res.status(500).json({
      message: 'Contact not found',
      error: 'Internal server error' });
  }
};

// Create new contact
const addContact = async (req, res, next) => {
  try {
    const validatedData = await contactSchema.validateAsync(req.body);

    // Verificar si ya existe un contacto con el mismo número de teléfono
    const existingContact = await Contact.findOne({
      where: {
        phone: validatedData.phone
      }
    });
    if (existingContact) {
      return res.status(409).json({ error: 'Phone number already exists' });
    }

    const newContact = await Contact.create(validatedData);
    res.status(201).json({
      message: 'New contact has been created successfully',
      data: newContact
    });
  }
  catch (err) {
    if (err.details) {
      res.status(400).json({ error: err.details[0].message });
    }
    else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Delete contact by ID
const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.destroy({ where: { id } });
    return res.status(200).json({
      message: 'Contact has been deleted successfully'
    });
  }
  catch {
    res.status(500).json({
      message: 'Contact not found',
      error: 'Internal server error' });
  }
};

// Update contact
const editContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, lastname, phone, favourite } = req.body;

  try {
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (name) updatedFields.lastname = lastname;
    if (phone) updatedFields.phone = phone;
    if (favourite !== undefined) updatedFields.favourite = favourite;

    await contact.update(updatedFields);

    await contact.save();

    res.status(200).json({
      message: 'The contact has been updated successfully',
      data: contact
    });
  }
  catch (err) {
    res.status(500).json({
      message: 'An error occurred while trying to update the contact',
      error: 'Internal server error' });
  }
};

// Get favourites contacts
const getFavouritesContacts = async (req, res, next) => {
  try {
    const favourites = await Contact.findAll({ where: { favourite: true } });

    if (favourites.length === 0) {
      return res.status(204).json({ message: 'You have no favorite contacts' });
    }

    return res.status(200).json({
      message: 'Here are your favourite Contacts',
      data: favourites
    });
  }
  catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getContactbyName = async (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(404).json({ error: 'Please provide a valid name' });
  }

  try {
    const filter = await Contact.findAll({ where: { name } });

    if (filter.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({
      message: 'Search result:',
      data: filter
    });
  }
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getContactbyLastName = async (req, res, next) => {
  const { lastname } = req.body;

  if (!lastname || typeof lastname !== 'string' || lastname.trim() === '') {
    return res.status(404).json({ error: 'Please provide a valid lastname' });
  }

  try {
    const filter = await Contact.findAll({ where: { lastname } });

    if (filter.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({
      message: 'Search result:',
      data: filter
    });
  }
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getContacts,
  getContactbyID,
  addContact,
  deleteContact,
  editContact,
  getFavouritesContacts,
  getContactbyName,
  getContactbyLastName
};
