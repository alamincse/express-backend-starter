const { body, validationResult } = require('express-validator');
const User = require('@app/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthController {
	async login(req, res) {
    	try {
    		await body('email')
    				.notEmpty().withMessage('Email is required').bail()
    				.isEmail().withMessage('Invalid email')
    				.run(req);

    		await body('password')
    				.notEmpty().withMessage('Password is required').bail()
    				.isLength({ min: 3 }).withMessage('Password must be at least 3 characters')
    				.run(req);

    		const errors = validationResult(req);

    		if (! errors.isEmpty()) {
    			const errorObject = {};

	          	errors.array().forEach(err => {
		            errorObject[err.path] = err.msg; 
	          	});

	          	return res.status(400).json({ errors: errorObject });
    		}

      		const { email, password } = req.body;

      		const user = await User.findOne({ email });

      		if (! user) {
	    		return res.status(400).json({ 
	    			errors: {
	    				message: 'Invalid credentials'
	    			} 
	    		});
		    }

		    const isPasswordMatch = await bcrypt.compare(password, user.password);

		    if (! isPasswordMatch) {
		    	return res.status(400).json({ errors: {
	    				message: 'Invalid credentials'
	    			} 
    			});
		    }

		    const payload = { 
		    	id: user._id, 
		    	name: user.name,
		    };

		    const expiresIn = { 
		    	expiresIn: process.env.JWT_EXPIRES_IN ?? '1h' 
		    }

		    // JWT generate
		    const token = jwt.sign(
	      		payload,
		      	process.env.JWT_SECRET ?? "secretKey123", 
		      	expiresIn
		    );

      		res.status(200).json({ token, message: 'Success' });
    	} catch (error) {
      		res.status(400).json({ error: error.message });
    	}
  	}

  	async logout(req, res) {
    	try {
      		// const user = await User.create(req.body);

      		// res.status(200).json(user);
    	} catch (error) {
      		res.status(400).json({ error: error.message });
    	}
  	}
}

module.exports = new AuthController();