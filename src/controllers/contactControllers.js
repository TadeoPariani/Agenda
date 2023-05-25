const { sequelize, Sequelize, Contact} = require ('../../models')
const express = require('express');
const router = express.Router();
const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).required()
        .messages({
            'string.pattern.base': 'The name cannot contain numbers or special characters'
        }),
  phone: Joi.string().pattern(new RegExp('^[0-9]+$')).required()
        .messages({
            'string.pattern.base': 'The phone number can only be made up of numbers'
        }),
  favourite: Joi.boolean().optional(),
});

// View all contacts
const getContacts = async (req, res, next) => {
  try{
    const viewAllContacts  = await Contact.findAll({})
    res.json(
      {
        message:"Here are all your available Contacts", 
        data:viewAllContacts
      });
    }catch{
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
}

// View a single contact by id
const getContactbyID = async (req, res,next) => {
  try{
  const viewContact = await Contact.findOne({where: {id: req.params.id}})
  res.json(
    {
      message:"Here is your Contact", 
      data:viewContact
    });
  }catch{
    console.error(err);
    res.status(500).json({ 
      message: 'Contact not found',
      error: 'Internal server error' });
  }
}

// Create new contact
const addContact = async (req, res, next) => {
  try {
    const validatedData = await contactSchema.validateAsync(req.body);
    const newContact = await Contact.create(validatedData);
    res.status(201).json({
      message: 'New contact has been created successfully',
      data: newContact,
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

// Delete contact by ID
const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.destroy({ where: { id } });
    return res.status(204).json({
      message: 'Contact has been deleted successfully',
    });
    
  }catch{
    console.error(err);
    res.status(500).json({ 
      message: 'Contact not found',
      error: 'Internal server error' });
  }
}


// Update contact
const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, favourite } = req.body;

  try {
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (phone) updatedFields.phone = phone;
    if (favourite !== undefined) updatedFields.favourite = favourite;

    await contact.update(updatedFields);

    await contact.save();

    res.status(200).json({
      message: 'The contact has been updated successfully',
      data: contact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: 'An error occurred while trying to update the contact',
      error: 'Internal server error' });
  }
};

// Get favourites contacts
const getFavouritesContacts = async (req, res, next) => {
  try{
  const favourites = await Contact.findAll({ where: { favourite: true }});
  res.json({
    message: "Here are your favourite Contacts",
    data: favourites,
  });
  }catch{
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getContactbyName = async (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Please provide a valid name' });
  }

  try {
    const filter = await Contact.findAll({ where: { name: name } });

    if (filter.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({
      message: 'Search result:',
      data: filter,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getContacts,
  getContactbyID,
  addContact,
  deleteContact,
  updateContact,
  getFavouritesContacts,
  getContactbyName
 
};