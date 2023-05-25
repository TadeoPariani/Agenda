const express = require('express');
const router = express.Router();

const {

   getUsers,
   getUser,
   editUser,
   deleteUser,
   addUser

} = require('../controllers/userControllers')

const { 

   login,
   verificationId

} = require('../middleware/middle')

router.get('/', getUsers)

router.get('/:id', verificationId, getUser)

router.post('/', login, addUser)

router.put('/:id', verificationId, editUser)

router.delete('/:id', verificationId, deleteUser)




module.exports = router;