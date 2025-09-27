const jwt = require('jsonwebtoken');

class RedirectIfAuthenticated {
	handle = (req, res, next) => {
        try {
            let token = '';
            let isBearer = false;

            const authHeader = req.headers['authorization'] ?? '';

            // Check Bearer token
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];

                isBearer = true;
            } else if (req.cookies && req.cookies.session_token) {
            	// Check cookie token
                token = req.cookies.session_token;
            }

            if (! token) {
                // no token, proceed to login/register page
                return next();
            }

            // JWT verify
            try {
	            const decoded = jwt.verify(token, process.env.JWT_SECRET);

	            return res.redirect('/dashboard'); // token valid, redirect to dashboard
	        } catch (err) {
	            console.log(err);

	            // proceed to login/register page
	            return next();
	        }

        } catch (err) {
            console.error(err.stack ?? err.message);

            // proceed to login/register page
            next();
        }
    }
}

const middleware = new RedirectIfAuthenticated();

module.exports = middleware.handle;