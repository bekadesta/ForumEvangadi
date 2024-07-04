require("dotenv").config()
const express = require("express");
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5500;

// db connection
const dbconnection = require("./db/dbConfig")

app.use(cors())
app.use(express.json());

// userRoute middleware
const userRoutes = require("./routes/userRoute")
app.use("/api/users", userRoutes)

// question routes middleware
const ask = require("./routes/questionRoute")
app.use("/api/questions", ask)

const answerquestions = require("./routes/answerRoute");
app.use("/api/answer", answerquestions); //answer route middleware

app.get("/", (req, res) => {
  res.send("Welcome to the Forum Backend API");
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Answer route middleware

 async function start() {
    try{
        // const result = await dbconnection.execute("select 'test' ")
        console.log("database connection established")
        console.log(`listening on ${port}`)
       }catch (error) {
         console.log(error.message)  
       }       
}
start()
