const User = require('@models/User');

class UserController {
	async store(req, res) {
    	try {
      		const user = await User.create(req.body);

      		res.status(200).json(user);
    	} catch (error) {
      		res.status(400).json({ error: error.message });
    	}
  	}
}

module.exports = new UserController();