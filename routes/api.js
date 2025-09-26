const express = require('express');
const UserController = require('@app/controllers/api/userController');

const Route = express.Router();

Route.post('/users', (req, res) => UserController.store(req, res));
// Route.post('/', UserController.store);

module.exports = Route;