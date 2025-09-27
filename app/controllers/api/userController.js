const { body, validationResult } = require('express-validator');
const User = require('@app/models/User');
const bcrypt = require('bcrypt');

class UserController {
	async store(req, res) {
    	try {
        await body('name')
                .notEmpty().withMessage('Name is required')
                .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
                .run(req);

        await body('email')
                .notEmpty().withMessage('Email is required')
                .isEmail().withMessage('Invalid email')
                .custom(async (value) => {
                  const user = await User.findOne({ email: value });
                  if (user) throw new Error('Email already in use');
                })
                .run(req);

        await body('password')
                .notEmpty().withMessage('Password is required')
                .isLength({ min: 3 }).withMessage('Password must be at least 3 characters')
                .run(req);

        await body('status')
              .optional()
              .isIn(['active', 'inactive']).withMessage('Status must be active or inactive')
              .run(req);

        const errors = validationResult(req);

        if (! errors.isEmpty()) {
          const errorObject = {};

          errors.array().forEach(err => {
            errorObject[err.path] = err.msg; 
          });

          return res.status(400).json({ errors: errorObject });
          // return res.status(400).json({ errors: errors.array() });
        }

    		const { name, email, password, status } = req.body;

    		const hashedPassword = await bcrypt.hash(password, 10);

    		const data = {
				name, 
				email, 
				status, 
				password: hashedPassword,
    		};
          Log.info(data);
      		const user = await User.create(data);

      		res.status(200).json({ user, message: 'Success' });
    	} catch (error) {
      		res.status(400).json({ error: error.message });
    	}
  	}
}

module.exports = new UserController();