/**
 * AppServer
 *
 * Express.js HTTP server class to handle both static files and dynamic routes.
 *
 * Features:
 *  - Serves static files via StaticFileHandler
 *  - Resolves dynamic routes using RouteServiceProvider
 *  - Configurable host and port
 *  - Handles server errors gracefully
 */
require('module-alias/register'); // load module alias register(first)
const express = require('express');
const env = require('@config/env');
const Route  = require('@app/providers/RouteServiceProvider');
require('@config/db');

class AppServer {
	/**
   	 * Creates an instance of AppServer.
	 *
	 * @param {number} port - The port number to listen on
	 * @param {string} host - The host IP or domain
	 */
	constructor(port, host) {
		/**
	     * @type {number} Server port
	     */
		this.port = port;

		/**
	     * @type {string} Server host
	     */
		this.host = host;

		this.app = express();

		this.middlewares();
    	this.registerRoutes();
		this.setViewEngine();
	}

	// Middlewares
	middlewares() {
	    this.app.use(express.json());
  	}

  	// Routes
	registerRoutes() {
		new Route(this.app).loadRoutes();
	}

	// View Engine
	setViewEngine() {
		this.app.set('view engine', 'ejs');
	}

	// Start Server
	createServer() {
		try {
			this.app.listen(this.port, () => {
				console.log(`Server is running at ${this.host}:${this.port}`);
			});
		} catch(error) {
			console.error('Caught exception: ', error.stack ?? error.message);
		}
	}
}

/**
 * Bootstrap and start the server
 * Loads environment config, global helpers and bootstrap.
 */
const server = new AppServer(env.port, env.host);

server.createServer();