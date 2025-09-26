require('dotenv').config();

const environments = {
	staging: {
		host: process.env.APP_URL ?? 'http://localhost',
	    port: process.env.APP_STAGING_ENV_PORT ?? 3000,
	    db: process.env.APP_STAGING_DB ?? "mongodb://localhost/staging_db"
  	},
  	development: {
  		host: process.env.APP_URL ?? 'http://localhost',
	    port: process.env.APP_DEVELOPMENT_ENV_PORT ?? 4000,
	    db: process.env.APP_DEVELOPMENT_DB ?? "mongodb://localhost/dev_db"
  	},
	production: {
		host: process.env.APP_URL ?? 'http://localhost',
	    port: process.env.APP_PRODUCTION_ENV_PORT ?? 5000,
	    db: process.env.APP_PRODUCTION_DB ?? "mongodb://localhost/prod_db"
  	},
}

const currentEnv = process.env.NODE_ENV && environments[process.env.NODE_ENV] ? process.env.NODE_ENV : 'staging';

module.exports = environments[currentEnv];