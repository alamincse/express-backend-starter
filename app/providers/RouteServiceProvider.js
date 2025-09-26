/**
 * @class RouteServiceProvider
 * 
 * Handles registration of Web and API routes for the Express application.
 * Provides a safe fallback for empty route files to prevent runtime errors.
 * Can be extended to support middleware and route prefixes like Laravel.
 */
const express = require('express');
const webRoutes = require('@routes/web');
const apiRoutes = require('@routes/api');

class RouteServiceProvider {
	/**
     * Creates an instance of RouteServiceProvider.
     *
     * @param {import('express').Express} app - Express application instance
     */
	constructor(app) {
		/**
         * @type {import('express').Express}
         * @description Express app instance
         */
        this.app = app;
    }

    /**
     * Checks if the provided routes object is a valid Express Router.
     * Returns the router itself if valid, otherwise returns an empty router.
     *
     * @param {import('express').Router} routes - Routes to check
     * @returns {import('express').Router} Valid router instance
     */
    isEmptyRoutes(routes) {
    	return routes && routes.stack ? routes : express.Router();
    }

    /**
     * Registers Web routes with the application.
     * - Routes are mounted at the '/' prefix.
     *
     * @returns {void}
     */
    mapWebRoutes() {
    	const router = this.isEmptyRoutes(webRoutes);

        this.app.use('/', router);
    }

    /**
     * Registers API routes with the application.
     * Routes are mounted at the '/api' prefix.
     *
     * @returns {void}
     */
    mapApiRoutes() {
    	const router = this.isEmptyRoutes(apiRoutes);

        this.app.use('/api', router);
    }

    /**
     * Loads all route groups into the Express application.
     * This is the main entry point to register both Web and API routes.
     *
     * @returns {void}
     */
	loadRoutes() {
		this.mapWebRoutes();

        this.mapApiRoutes();
	}
}

module.exports = RouteServiceProvider;