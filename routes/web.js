const express = require('express');
const Route = express.Router();

const HomeController = require('@app/controllers/web/HomeController');
const DashboardController = require('@app/controllers/web/DashboardController');

Route.get('/', (req, res) => HomeController.index(req, res));
Route.get('/register', (req, res) => HomeController.register(req, res));

Route.get('/dashboard', (req, res) => DashboardController.index(req, res));

module.exports = Route;