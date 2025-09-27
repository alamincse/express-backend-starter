const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

class LoggerService {
	constructor() {
		if (! LoggerService.instance) {
			this.logger = createLogger({
				level: 'info',
		        format: format.combine(
	          		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		          	format.printf((info) => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`)
		        ),
		        transports: [
	          		new transports.Console(),  

		          	new transports.DailyRotateFile({
		            	filename: 'app-%DATE%.log',
		            	datePattern: 'YYYY-MM-DD',
		            	dirname: path.join(__dirname, '../../logs'),
		            	maxFiles: '14d',
		            	zippedArchive: true,
		            	level: 'info'
		          	}),
		          	new transports.DailyRotateFile({
			            filename: 'error-%DATE%.log',
			            datePattern: 'YYYY-MM-DD',
			            dirname: path.join(__dirname, '../../logs'),
			            maxFiles: '14d',
			            zippedArchive: true,
			            level: 'error'
		          	})
		        ]
			});

			LoggerService.instance = this;
		}

		return LoggerService.instance;
	}

	info(message) {
	    this.logger.info(message);
  	}

  	error(message) {
	    this.logger.error(message);
  	}

  	warn(message) {
	    this.logger.warn(message);
  	}

  	debug(message) {
	    this.logger.debug(message);
  	}
}

module.exports = new LoggerService();