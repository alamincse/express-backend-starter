const express = require('express');
const Route = express.Router();

const UserController = require('@app/controllers/api/UserController');
const AuthController = require('@app/controllers/api/AuthController');
const AuthMiddleware = require('@app/middleware/AuthMiddleware');

Route.post('/users', UserController.store);

Route.post('/login', AuthController.login);
Route.post('/logout', AuthMiddleware, AuthController.logout);

module.exports = Route;