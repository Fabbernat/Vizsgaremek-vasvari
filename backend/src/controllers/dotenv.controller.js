require('dotenv').config();

const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const jwtSecret = process.env.JWT_SECRET;
const nodeEnv = process.env.NODE_ENV;