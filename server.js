/**
 * AppServer
 *
 * Express.js HTTP server class to handle both static files and dynamic routes.
 *
 * Features:
 *  - Serves static files
 *  - Configurable view engine and layouts
 *  - Modular route registration
 *  - Logger & RenderService globally available
 *  - Handles server errors gracefully
 */
require('module-alias/register'); // load module alias register(first)
const express = require('express');
const env = require('@config/env');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const RenderService = require('@app/services/RenderService');
const LoggerService = require('@app/services/LoggerService');
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

		// Make RenderService, LoggerService globally available
    	global.Render = RenderService;
    	global.Log = LoggerService;

		this.registerMiddlewares();
	    this.setViewEngine();
	    this.setViewLayout();
	    this.registerRoutes();
	}

	/**
   	 * Register middlewares
   	 */
  	registerMiddlewares() {
	    this.app.use(express.json());
	    this.app.use(express.urlencoded({ extended: true }));

	    // access public folder via statically
	    this.app.use(express.static('public'));

	    // use express view engine layout
	    this.app.use(expressLayouts);

	    this.app.use(cookieParser());
  	}

	/**
     * Set EJS as view engine
     */
	setViewEngine() {
		this.app.set('view engine', 'ejs');
		this.app.set('views', 'views'); // optional view directory
	}

	/**
     * Set default layout
     */
	setViewLayout() {
		this.app.set('layout', 'layouts/main');
	}

	/**
     * Register application routes
     */
	registerRoutes() {
		new Route(this.app).loadRoutes();
	}

	// Start Server
	createServer() {
		try {
			/**
       		 * Start listening on configured host and port.
	         */
			this.app.listen(this.port, () => {
				Log.info(`Server is running at ${this.host}:${this.port}`);
			});

			/**
		     * Handle server-level unexpected errors.
		     */
		    this.app.on('error', (err) => {
	      		Log.error('Server error: ', error.stack ?? error.message);
		    });
		} catch(error) {
			Log.error('Caught exception: ', error.stack ?? error.message);
		}
	}
}

/**
 * Bootstrap and start the server
 * Loads environment config, global helpers and bootstrap.
 */
const server = new AppServer(env.port, env.host);

server.createServer();