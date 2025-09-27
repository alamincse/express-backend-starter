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
const rateLimit = require('express-rate-limit');

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
     * Rate limiter configuration only for API routes
     */
    apiRateLimiter() {
        return rateLimit({
            windowMs: 1 * 60 * 1000, // 1 minute
            max: 60, // limit each IP to 60 requests per windowMs
            standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
            legacyHeaders: false, // Disable `X-RateLimit-*` headers
            message: {
                errors: {
                    message: 'Too many attempts, please try again later.',
                },
            },
        });
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

        this.app.use('/api', this.apiRateLimiter(), router);
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