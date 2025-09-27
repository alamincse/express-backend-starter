const express = require('express');
const Route = express.Router();

const RedirectIfAuthenticated = require('@app/middleware/RedirectIfAuthenticated');
const DashboardController = require('@app/controllers/web/DashboardController');
const HomeController = require('@app/controllers/web/HomeController');
const AuthMiddleware = require('@app/middleware/AuthMiddleware');

Route.get('/', 
	(req, res, next) => RedirectIfAuthenticated.handle(req, res, next),
	(req, res) => HomeController.index(req, res)
);

Route.get('/register', 
	(req, res, next) => RedirectIfAuthenticated.handle(req, res, next),
	(req, res) => HomeController.register(req, res)
);

Route.get('/dashboard', 
	(req, res, next) => AuthMiddleware.handle(req, res, next), 
	(req, res) => DashboardController.index(req, res)
);

module.exports = Route;