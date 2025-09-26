const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
	},
	date: {
		type: Date,
		default: Date.now,
	},
}, { timestamps: true });

module.exports = userSchema;