const express = require('express');
const Route = express.Router();

const UserController = require('@app/controllers/api/UserController');
const AuthController = require('@app/controllers/api/AuthController');
const AuthMiddleware = require('@app/middleware/AuthMiddleware');

Route.post('/users', UserController.store);
Route.get('/users', AuthMiddleware, UserController.index);
Route.get('/users/:id', AuthMiddleware, UserController.show);
Route.put('/users/:id', AuthMiddleware, UserController.update);
Route.delete('/users/:id', AuthMiddleware, UserController.destroy);

Route.post('/login', AuthController.login);
Route.post('/logout', AuthMiddleware, AuthController.logout);

module.exports = Route;