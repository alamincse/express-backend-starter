const userSchema = require('@database/schemas/usersSchema');
const mongoose = require('mongoose');

class User {
	constructor() {
		this.model = mongoose.model('User', userSchema);
	}

	async findAll() {
	    return this.model.find();
  	}

	async findById(id) {
	    return this.model.findById(id);
	}

	async create(data) {
	    const user = new this.model(data);

	    return user.save();
  	}

  	async update(id, data) {
	    return this.model.findByIdAndUpdate(id, data, { new: true });
  	}

  	async delete(id) {
	    return this.model.findByIdAndDelete(id);
  	}
}

module.exports = new User();