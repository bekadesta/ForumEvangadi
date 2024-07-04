const express = require("express")
const router = express.Router()


const {question, selectquestion,  selectsinglequestion, selectanswer} = require("../Controller/questionController")
// router.post("/askquestion", question)

router.post("/ask", question);

router.get("/selectquestion", selectquestion);

router.get("/selectsinglequestion", selectsinglequestion);

router.get("/selectanswer", selectanswer);

module.exports = router;