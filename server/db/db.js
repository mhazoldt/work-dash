
const { Pool, Client } = require('pg')

const client = new Client({
  user: 'slefkvzqyqjptx',
  host: 'ec2-204-236-236-188.compute-1.amazonaws.com',
  database: 'd8u8c6lfted04n',
  password: 'ad9e26a701e7375ec42fddb60b7abdd20f73bb2b7baafce57118b80c50941063',
  port: 5432,
  ssl: true
})
client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

module.exports = client

// let mysql = require('mysql')


// let pool  = mysql.createPool({
//     host     : 'us-cdbr-iron-east-05.cleardb.net',
//     database: 'heroku_aa873bbcfa33182',
//     user     : 'b9b66a93656ded',
//     password : '81f2cb14'
//   });

//   pool.getConnection(function(err, connection) {
  
// });

//   module.exports = pool
