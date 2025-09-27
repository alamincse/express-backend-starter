const express = require('express');
const Route = express.Router();

const RedirectIfAuthenticated = require('@app/middleware/RedirectIfAuthenticated');
const DashboardController = require('@app/controllers/web/DashboardController');
const HomeController = require('@app/controllers/web/HomeController');
const AuthMiddleware = require('@app/middleware/AuthMiddleware');

Route.get('/', RedirectIfAuthenticated, HomeController.index);
Route.get('/register', RedirectIfAuthenticated, HomeController.register);

Route.get('/dashboard', AuthMiddleware, DashboardController.index);

module.exports = Route;