// Users Route
const express = require('express');
const router = express.Router();

// Controller
const { createUser, getUserById, getAllUsers, updateUser, deleteUser, updateAllUsers, forgetPassword } = require('../controllers/userController');
const { authen, permit } = require('../middleware/authen');

// Routes
router
  .get('/', getAllUsers)
  .post('/create', createUser)
  .get('/:id', authen, getUserById)
  .put('/:id', authen, updateUser)
  .delete('/:id', authen, permit, deleteUser)
  .post('/update', authen, updateAllUsers)
  .post('/forget-password', forgetPassword)

module.exports = router;