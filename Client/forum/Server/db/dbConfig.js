const mysql2 = require("mysql2");

// const dbconnection = mysql2.createConnection() 
const dbconnection = mysql2.createPool({
    user: process.env.USER,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    password: process.env.PASSWORD,
    connectionLimit:  10,
    port: process.env.DB_PORT
})

// console.log(process.env.JWT_SECRET)


module.exports = dbconnection.promise()