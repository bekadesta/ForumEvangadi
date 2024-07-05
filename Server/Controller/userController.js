const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")

async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body;
    if(!username || !firstname || !lastname || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "please provide all required fields" })
    }
    try{
        const [user] = await dbconnection.query("SELECT username, userid FROM users WHERE username=? OR email=?", [username, email]);
        // return res.json({user:user})
        if(user.length > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "user is already registered"})
        }
        if(password.length < 8){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Password has to be more the 8 characters"})
        }
        //encrpting the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);


        await dbconnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES(?,?,?,?,?)", [
            username, firstname, lastname, email, hashedPassword])

        const [newUser] = await dbconnection.query("SELECT * FROM users WHERE email=?", [email]);
        if (newUser.length === 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to retrieve user data after registration" });
        }

        const token = jwt.sign({ username: newUser[0].username, userid: newUser[0].userid }, process.env.JWT_SECRET, { expiresIn: "30d" });
    
        return res.status(StatusCodes.OK).json({msg: "user registered",
            token, 
            user: {
                username: newUser[0].username,
                firstname: newUser[0].firstname,
                lastname: newUser[0].lastname,
                email: newUser[0].email,
                userid: newUser[0].userid
            }
        })
    }catch(error){
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went terribly wrong, try again woulda"})
    }
} 


async function login(req, res) {
     const { email, password } = req.body;
     if(!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "please provide all required information"})
     }

     try{
        const [user] = await dbconnection.query("SELECT * FROM users WHERE email=?", [email]);
        if(user.length==0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Invalid Credentials"})
        }
        //Compare password with the hashed
        const isMatch = await bcrypt.compare(password, user[0].password)
        if(!isMatch){
            return res.status(StatusCodes.BAD_REQUEST).json("Invalid Credentials")
        }
        //JWT generation. In this case the payload contains username and userid
        const username = user[0].username;
        const userid = user[0].userid;
        const token = jwt.sign({username,userid}, process.env.JWT_SECRET, {expiresIn:"30d"})
        return res.status(StatusCodes.OK).json({msg:"logged in successfully", token, username, userid})
        //authentication middleware
     }catch(error) {
        console.log(error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong please try again woulda?"})
     }
}


async function check(req, res) {
    const username = req.user.username;
    const userid = req.user.userid;

    return res.status(StatusCodes.OK).json({ msg: "ValidUser", username, userid})
    // res.send("checkuser")
}

// async function createtable (req, res) {
//     const tables = 
//     `CREATE TABLE users(
//     userid INT(20) NOT NULL AUTO_INCREMENT,
//     username VARCHAR(20) NOT NULL, 
//     firstname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//     email VARCHAR(40) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     PRIMARY KEY(userid)
// );
// `
// const questions =  `CREATE TABLE questions(
//     id INT(20) NOT NULL AUTO_INCREMENT,
//     questionid VARCHAR(100) NOT NULL UNIQUE,
//     userid INT(20) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(200) NOT NULL,
//     tag VARCHAR(20),
//     PRIMARY KEY(id, questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
// );
// `
// const answertable = `CREATE TABLE answers(
//     answerid INT(20) NOT NULL AUTO_INCREMENT,
//     userid INT(20) NOT NULL,
//     questionid VARCHAR(100) NOT NULL,
//     answer VARCHAR(200) NOT NULL,
//     PRIMARY KEY(answerid),
//     FOREIGN KEY(questionid) REFERENCES questions(questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
// );`

// try{
//     await dbconnection.query(answertable)
//     return res.status(StatusCodes.OK).json({ msg: "Table Created" });
// }catch(error){
//     console.log(error.message)
// }
// }

module.exports = {register, login, check}