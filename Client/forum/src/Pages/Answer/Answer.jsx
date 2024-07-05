import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { AppState } from "../../App";
import classes from "./Answer.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { FaArrowAltCircleRight } from "react-icons/fa";

function Answer() {
  const { questionId } = useParams();
  const answerDOM = useRef();
  const { user } = useContext(AppState);
  const [singledata, setsingledata] = useState({});
  const [answering, setanswer] = useState({});
  const [message, setMessage] = useState("");
  const [ansmessage, setansmessage] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/api/questions/selectsinglequestion`, {
          params: { questionId },
        });
        if (data.question) {
          setsingledata(data.question);
        } else {
          console.error("Question not found:", data);
        }
        const qanswer = await axios.get(`/api/questions/selectanswer`, {
          params: { questionId },
        });
        setanswer(qanswer.data.Allanswers || []);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [questionId]);
console.log(user.userid, questionId, answervalue)
  async function handleSubmit(e) {
    e.preventDefault();
    const answervalue = answerDOM.current.value;
    if (!answervalue) {
      setMessage("The fields are required");
      return;
    }
    
    try {
      await axios.post("/api/answer/answerQuestion", {
        userid: user.userid,
        questionId: questionId,
        answer: answervalue,
      });
      setansmessage("The Answer Posted Successfully");
      answerDOM.current.value = "";

      const qanswer = await axios.get(`/api/questions/selectanswer`, {
        params: { questionId },
      });
      setanswer(qanswer.data.Allanswers || []);
    } catch (error) {
      console.error("Error posting answer:", error.message)
      alert(error.response?.data?.msg || "Posting not working");
    }
    }  

    return (
    <section className={classes.answer}>
      <section className={classes.answer__container}>
        <div className={classes.answer__title}>
          <h1>QUESTIONS</h1>
          <div>
            <div>
              <FaArrowAltCircleRight
                size={30}
                style={{ padding: "10px 5px 0px", color: "#516CF0" }}
              />
              <span className={classes.title}>{singledata.title}</span>
            </div>
            <p>{singledata.description}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1 style={{ fontSize: "40px", fontWeight: "500" }}>
            Answers From The Community
          </h1>
          <div className={classes.answer__display}>
          {answering.length > 0 ? (
              <QuestionCard
                flex={false}
                flexsmall={true}
                angle={false}
                avsize={50}
                data={{ Allanswers: answering }}
              />
            ) : (
              <p>No Answer is Posted</p>
            )}
          </div>
        </div>
        <div>
          <div
            style={{
              color: "red",
              textAlign: "center",
              paddingBottom: "5px",
            }}
          >
            {message}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div
              style={{
                color: "green",
                textAlign: "center",
                paddingBottom: "7px",
              }}
            >
              {ansmessage}
            </div>
            <textarea
              name="answer"
              ref={answerDOM}
              id="answerid"
              placeholder="Your answer"
              rows="6"
              cols={"50"}
            ></textarea>
            <button type="submit">Post Answer</button>
          </form>
        </div>
      </section>
    </section>
    );
}

export default Answer;

