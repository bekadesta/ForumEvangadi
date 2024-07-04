import { useEffect, useState } from "react";
import Home from "./Pages/HomePage/Home.jsx";
import Login from "./Pages/LoginPage/Login.jsx";
import Register from "./Pages/RegisterPage/Register.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig.js";
import './index.css'; 
import { createContext } from "react";
import Question from "./Pages/Question/Question.jsx";
import Answer from "./Pages/Answer/Answer.jsx";
export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  async function check() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      setIsLoggedIn(false);
      return;
    }

    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("User data from /users/check:", data);
      setUser({ username: data.username, userid: data.userid });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Token verification failed:", error.message);
      navigate("/login");
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    check();
  }, []);

  async function handleLogout() {
    try {
      setUser({});
      localStorage.removeItem("token");
      setUser(null)
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }



  return (
    <AppState.Provider value={{user, setUser, isLoggedIn, handleLogout, setIsLoggedIn}}>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/askquestion' element={<Question />} />
        <Route path='/' element={<Home />} />
        <Route path="/answer/:questionId" element={<Answer />} />
      </Routes>
    </AppState.Provider>

  );
}

export default App;
