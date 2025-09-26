const mongoose = require('mongoose');

class Database {
	constructor() {
		this.uri = 'mongodb://127.0.0.1/crud';
	}

	async connect() {
		try {
			await mongoose.connect(this.uri);

			console.log('Mongo Database successfully connected');
		} catch(error) {
			console.error('Database connection failed:', error.message);

			process.exit(1);
		}
	}
}

const db = new Database();

const dbConn = db.connect();

module.exports = dbConn;