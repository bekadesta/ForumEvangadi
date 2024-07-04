const dbconnection = require("../db/dbConfig");
const {StatusCodes} = require("http-status-codes")


async function question(req, res) {
    const questionId = Math.floor(1000000000 + Math.random() * 9000000000);
    const { userid, title, description } = req.body;
    // const {userid} = req.user;

    if (!title || !description || !userid || !questionId) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }

    try {
        await dbconnection.query("INSERT INTO questions ( userid, title, description, questionid) VALUES (?, ?, ?, ?)",
           [userid, title, description, questionId] 
        );
        
        return res.status(StatusCodes.CREATED).json({msg: "Question Posted Successfully"})
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.msg || "Something went wrong. Please try again later.")
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong. Try Again Later" });
    }
}

async function selectquestion(req, res) {
    try {
        const query = `SELECT users.username, questions.title, questions.questionid 
        FROM users JOIN questions ON users.userid = questions.userid ORDER BY questions.id DESC;`
        const [rows] = await dbconnection.query(query);
        const AllQuestions = rows.map((row) => ({
            username: row.username,
            title: row.title,
            questionId: row.questionid,
          }));
          return res.status(StatusCodes.OK).json({ AllQuestions: AllQuestions,
          });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong. Please try again later." });
    }
}

async function selectsinglequestion(req, res) {
    const { questionId } = req.query;
    // const questionId = req.query.questionId;

    console.log("This is question Id", questionId)

  try {
    const query = `
      SELECT questions.title, questions.description 
      FROM questions 
      WHERE questionid = ?`;
    const [rows] = await dbconnection.query(query, [questionId]);

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
    }
    const question = rows[0];
    return res.status(StatusCodes.OK).json({ question });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong. Please try again later." });
  }
}

async function selectanswer(req, res) {
  const { questionId } = req.query;
  try {
    const query = `
      SELECT users.username, answers.answer
      FROM users 
      JOIN answers ON users.userid = answers.userid WHERE answers.questionid = ? `;
    const [rows] = await dbconnection.query(query, [questionId]);
    if (rows.length === 0) {
      return res
        .status(StatusCodes.OK)
        .json({Allanswers: []});
    }
    const Allanswers = rows.map((row) => ({
      username: row.username,
      answer: row.answer,
    }));
    return res.status(StatusCodes.OK).json({ Allanswers });
  } catch (error) {
    // console.error("Error executing SQL query:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Please try again later." });
  }
}

module.exports = {question, selectquestion, selectsinglequestion, selectanswer};