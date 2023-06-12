const express = require('express');
const { sequelize, Sequelize, User } = require('../../models');
const { hashPass, userSchema } = require('../auth/auth');

const getUsers = async (req, res, next) => {
  const allUsers = await User.findAll({});
  res.status(200).json({ message: 'All your users', data: allUsers });
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  const existingUser = await User.findByPk(id);
  if (existingUser) {
    res.status(200).json({ message: 'User: ', data: existingUser });
  }
  else {
    res.status(400).json({ error: 'bad request' });
  }
};

const addUser = async (req, res, next) => {
  const { body } = req;
  try {
    const validatedData = await userSchema.validateAsync(body);
    const existingUserEmail = await User.findOne({
      where: {
        email: validatedData.email
      }
    });
    if (existingUserEmail) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    const hashedPassword = await hashPass(body.password);
    if (hashedPassword) {
      validatedData.password = hashedPassword;
      await User.create(validatedData);
      res.status(201).json({ message: 'New user has been created successfully', data: validatedData });
    }
  }
  catch (err) {
    if (err.details) {
      res.status(400).json({ error: err.details[0].message });
    }
    else {
      res.status(500).json({ error: 'Internal server error', body });
    }
  }
};

const editUser = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const validatedData = await userSchema.validateAsync(body);
    const hashedPassword = await hashPass(body.password);
    if (hashedPassword) {
      validatedData.password = hashedPassword;
      const existingUser = await User.findByPk(id);
      existingUser.name = validatedData.name;
      existingUser.email = validatedData.email;
      existingUser.password = validatedData.password;
      await existingUser.save();
      res.status(201).json({ message: 'The user has been edited successfully', data: validatedData });
    }
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

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const existingUser = await User.findByPk(id);
  if (existingUser) {
    await existingUser.destroy({
      where: {
        id
      }
    });
    const UsersDb = await User.findAll({});
    res.status(200).json({ message: 'User deleted', data: UsersDb });
  }
  else {
    res.status(400).json({ error: 'bad request' });
  }
};

module.exports = {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  addUser
};
