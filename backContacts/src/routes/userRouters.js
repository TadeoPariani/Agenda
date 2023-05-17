const express = require('express');
const router = express.Router();

const {

   getUsers,
   getUser,
   editUser,
   deleteUser,
   addUser,
   verificationId

} = require('../controllers/userControllers')

router.get('/', getUsers)

router.get('/:id', verificationId, getUser)

router.post('/', addUser)

router.put('/:id', verificationId, editUser)

router.delete('/:id', verificationId, deleteUser)




module.exports = router;