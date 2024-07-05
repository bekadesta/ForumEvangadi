const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function answerQuestion(req, res) {
  const { userid, questionId, answer } = req.body;

  try {

    console.log("Received data:", { userid, questionId, answer });
    const [result] = await dbconnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionId, userid, answer]
    );
    console.log("result:", result);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "The answer has been posted successfully." });
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "EMBIALE" });
  }
}
module.exports = { answerQuestion };
