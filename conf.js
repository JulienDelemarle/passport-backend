const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_SCHEMA,
  BACK_PORT,
  BCR_SALTROUNDS,
  JWT_SECRET,
} = process.env;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_SCHEMA,
  connectionLimit: 10,
});

module.exports = {
  db,
  backendPort: BACK_PORT,
  saltRounds: BCR_SALTROUNDS,
  secretOrPrivateKey: JWT_SECRET,
};
