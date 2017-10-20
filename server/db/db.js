let mysql = require('mysql')
let pool  = mysql.createPool({
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    database: 'heroku_aa873bbcfa33182',
    user     : 'b9b66a93656ded',
    password : '81f2cb14'
  });

  pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
});

  module.exports = pool
