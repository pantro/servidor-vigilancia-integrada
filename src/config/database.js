const mysql = require('mysql');
//Requiere dotenv
require('dotenv').config({ path:'variables.env' });

// Set database connection credentials
const config = {
  host: 'chirimacha-main.cojvkfkjmqcg.us-west-2.rds.amazonaws.com',
  user: 'masterUser',
  password: 'ChagasShiny1!1',
  database: 'CHAGAS_GENERAL',
  multipleStatements: true
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;