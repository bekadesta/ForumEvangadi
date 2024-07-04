const express = require("express")
const router = express.Router()

//authentication middleware
const authMiddleware = require("../Middleware/authMiddleware")

// User Controllers
const {register, login, check} = require("../Controller/userController")

// registration route
router.post("/register", register) 

// login route
router.post("/login", login)

//route for authentication
router.get("/check", authMiddleware ,check)

module.exports = router