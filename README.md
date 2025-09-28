# Express.js App

A simple **Express.js boilerplate project** following MVC structure. This project includes Routing, Controllers, Middleware, Authentication and RESTful APIs for quick development setup.

---

## Features

- Express.js with MVC architecture
- JWT authentication with middleware
- RESTful API structure (CRUD)
- Organized routes, controllers, models and services
- Input validation
- Secure authentication system
- MongoDB (mongoose)
- EJS template engine

---

## Folder Structure
<pre lang="bash">
express.js-app/
├── app/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── providers/
│ └── services/
├── database/
│ ├── schemas/
├── public/
├── routes/
│ ├── api.js
│ └── web.js
├── config/
├── views/
├── server.js
└── package.json
</pre>

## Installation & Setup

1. Clone the repository
```bash
git clone git@github.com:alamincse/express-backend-starter.git
cd express-backend-starter
```
2. Install dependencies
```bash
npm install
```
3. Create a `.env` file (use `.env.example` as reference)
```js
APP_NAME='MVC APP Express.js'
DB_CONNECTION=mongodb
DB_HOST=127.0.0.1
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=crud
DB_PORT=27017

APP_URL=http://localhost

SECRET_KEY=secret

JWT_SECRET=jwt_secret
JWT_EXPIRES_IN=1h

APP_STAGING_ENV_PORT=3000
APP_STAGING_DB=mongodb://127.0.0.1/crud
APP_STAGING_ENV_NAME=staging

APP_DEVELOPMENT_ENV_PORT=4000
APP_DEVELOPMENT_DB=
APP_DEVELOPMENT_ENV_NAME=development

APP_PRODUCTION_ENV_PORT=5000
APP_PRODUCTION_DB=
APP_PRODUCTION_ENV_NAME=production
```

4. Run the development server
```js
node server

#or 
nodemon server
```

## Author
##### Al-Amin Sarker