import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./Home.module.css";
import { AppState } from "../../App";
import React, { useEffect, useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import LayOut from "../../Layout/LayOut";

function Home() {
const [selectData, setSelectData] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function selectUser() {
      try {
        const { data } = await axios.get("/questions/selectquestion", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data && data.AllQuestions) {
          setSelectData(data.AllQuestions);
          setFilteredData(data.AllQuestions);
        } else {
          setSelectData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.log(error.response);
        navigate("/");
      }
    }
  
    if (token) {
      selectUser();
    } else {
      navigate("/");
    }
  }, [token, navigate]);
  

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = selectData.filter((question) =>
      question.title.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };


  return (
    <LayOut>
      <section className={classes.home}>
      <div className={classes.home__container}>
        <div className={classes.home__welcome}>
          <div className={classes.home__question}>
            <p>
              <Link to={"/askquestion"}>Ask Question</Link>
            </p>
          </div>
          <div className={classes.welcome_container} >
           Welcome: <span className={classes.username}>{user?.username}</span>
          </div>
        </div>
        <div className={classes.home__input}>
          <input
            type="text"
            placeholder="Search Question"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <hr />
        {filteredData && filteredData.length > 0 ? (
          <>
            {filteredData.map((question, index) => (
              <Link to={`/answer/${question.questionId}`} key={index}>
                <div className={classes.Iconuser}>
                  <div className={classes.LeftDivision}>
                    <FaUserCircle
                      size={100}
                      style={{ padding: "0 20px 0 10px", margin: "0" }}
                    />
                    <div className={classes.user}>{question.username}</div>
                  </div>
                  <div className={classes.MiddleDivision}>{question.title}</div>
                  <div className={classes.RightDivision}>
                    <FaAngleRight
                      className={classes.angle}
                      size={40}
                      style={{ paddingTop: "50" }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p>No questions posted</p>
        )}
      </div>
    </section>
    </LayOut>
  );
}

export default Home;
