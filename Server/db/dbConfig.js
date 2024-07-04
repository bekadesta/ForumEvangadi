const mysql2 = require("mysql2");

// const dbconnection = mysql2.createConnection() 
const dbconnection = mysql2.createPool({
    user: process.env.USER,
    database: process.env.DATABASE,
    host:"localhost",
    password: process.env.PASSWORD,
    connectionLimit:  10
})

// console.log(process.env.JWT_SECRET)


module.exports = dbconnection.promise()