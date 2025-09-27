const express = require('express');
const Route = express.Router();

const HomeController = require('@app/controllers/web/HomeController');

Route.get('/', (req, res) => HomeController.index(req, res))
Route.get('/register', (req, res) => HomeController.register(req, res))

module.exports = Route;