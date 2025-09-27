const jwt = require('jsonwebtoken');

class AuthMiddleware {
	handle = (req, res, next) => {
		try {
			let token = '';
			let isBearer = false;

			const authHeader = req.headers['authorization'] ?? '';

			// check bearer token
			if (authHeader && authHeader.startsWith('Bearer ')) {
			    token = authHeader.split(' ')[1];

			    isBearer = true;
			} else if (req.cookies && req.cookies.session_token) { 
				// check cookie token
			    token = req.cookies.session_token;
			}

	        if (! token) {
	        	// redirect if cookie, else JSON response
	            if (isBearer) {
	                return res.status(401).json({ message: 'Unauthorized: No token provided' });
	            } else {
	                return res.redirect('/');
	            }	            
	        }

	        // JWT verification (async)
            let payload;

            try {
                payload = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                if (isBearer) {
                	return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
                } else {
                	return res.redirect('/');
                }
            }

	        req.user = payload;

	        next();
		} catch (err) {
			Log.error(err.stack ?? err.message);

			if (req?.headers['authorization']) {
	            return res.status(500).json({ error: err.message });
	        } else {
	            return res.redirect('/');
	        }
		}
	}
}

module.exports = new AuthMiddleware();