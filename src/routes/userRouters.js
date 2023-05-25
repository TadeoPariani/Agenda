const express = require('express');
const router = express.Router();
const { login } = require('../auth/auth');
const { verificationId } = require('../auth/auth')

const {

   getUsers,
   getUser,
   editUser,
   deleteUser,
   addUser

} = require('../controllers/userControllers')

router.get('/', getUsers)

router.get('/:id', verificationId, getUser)

router.post('/', login, addUser)

router.put('/:id', verificationId, editUser)

router.delete('/:id', verificationId, deleteUser)




module.exports = router;