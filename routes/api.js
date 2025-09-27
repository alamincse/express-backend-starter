const express = require('express');
const Route = express.Router();

const UserController = require('@app/controllers/api/UserController');
const AuthController = require('@app/controllers/api/AuthController');


Route.post('/users', (req, res) => UserController.store(req, res));

Route.post('/login', (req, res) => AuthController.login(req, res));
Route.post('/logout', (req, res) => AuthController.logout(req, res));

module.exports = Route;