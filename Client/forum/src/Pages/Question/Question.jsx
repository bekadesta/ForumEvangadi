import React, { useState, useRef, useContext, useEffect } from "react";
import classes from "./Question.module.css";
import axios from "../../axiosConfig";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AppState } from "../../App";
import LayOut from "../../Layout/LayOut";


function Question() {
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const titleDOM = useRef();
  const userDescDOM = useRef();
  const [singledata, setsingledata] = useState({});
  const [answering, setanswer] = useState({});
  const [message, setmessage] = useState();
  const [messagee, setMessagee] = useState("");
  let { questionId } = useParams();

  useEffect(() => {
    async function selectsinglequestion() {
      try {
        const { data } = await axios.get(`/api/answer/selectsinglequestion`, {
          params: { questionId },
          headers: { authorization: "Bearer " + token },
        });
        setsingledata(data.question);

        const qanswer = await axios.get(`/api/questions/selectanswer`, {
          params: { questionId },
          headers: { authorization: "Bearer " + token },
        });
        setanswer(qanswer.data.Allanswers);
      } catch (error) {
        console.log(error);
      }
    }
    if (questionId) {
      selectsinglequestion();
    }
  }, [questionId, token]);



  async function handleSubmit(e) {
    e.preventDefault();

    const titlevalue = titleDOM.current.value;
    const Descvalue = userDescDOM.current.value;

    if (!titlevalue || !Descvalue) {
      setMessagee("The fields are required");
      return;
    }
    try {
      await axios.post("/api/questions/ask" , {
        userid: user.userid,
        title: titlevalue,
        description: Descvalue,
      });
      setmessage("The Question Posted Successfully ");
      setTimeout(() => {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
        navigate("/", { state: { time: formattedTime } });
      }, 1500);
    } catch (error) {
      alert("Something went wrong again later.");
      console.log(error);
    }
  }
  return (
    <LayOut>
      <section className={classes.askquestions}>
      <div>
        <div className={classes.askquestion__title}>
          <h3>Steps to write a good question</h3>
          <ul>
            <li>Summerize your problem in one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and you expect to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div className={classes.form__container}>
          <h3>Ask a public question</h3>

          <Link to={"/"}>Go to Question page</Link>
          <div>
            <p
              style={{
                color: "red",
                textAlign: "center",
                paddingBottom: "5px",
              }}
            >
              {" "}
              {messagee}
            </p>
          </div>
          <div
            style={{
              color: "green",
              textAlign: "center",
              paddingBottom: "5px",
            }}
          >
            {message}
          </div>
          <form action=""   onSubmit={handleSubmit}>
            <input ref={titleDOM} type="text" placeholder="Title" />

            <textarea
              name="description"
              ref={userDescDOM}
              id="desc"
              rows="6"
              cols="50"
              maxLength="200"
              placeholder="Question Description"
            ></textarea>
            <button type="submit">Post Question</button>
          </form>
        </div>
      </div>
    </section>
    </LayOut>

  );
}

export default Question;
