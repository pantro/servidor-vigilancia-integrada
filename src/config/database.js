const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'chirimacha-main.cojvkfkjmqcg.us-west-2.rds.amazonaws.com',
  user: 'masterUser',
  password: 'ChagasShiny1!1',
  database: 'CHAGAS_GENERAL',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
