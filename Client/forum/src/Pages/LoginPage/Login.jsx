import React, { useContext, useRef, useState } from 'react';
import axios from '../../axiosConfig';
import {Link, useNavigate} from 'react-router-dom'; 
import classes from './Login.module.css'
import { MdOutlineVisibility } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import LayOut from '../../Layout/LayOut';
import { AppState } from '../../App';


function Login() {
  const navigate = useNavigate()
  const { setIsLoggedIn, setUser } = useContext(AppState);
  const emailDom = useRef()
  const passwordDom = useRef()
  const [showPassword, setShowPassword] = useState(false);

  const TogglePassword = () => {
    setShowPassword(!showPassword);
  };
  async function handleSubmit(e) {
    e.preventDefault()
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if(!emailValue||!passwordValue) {
      alert("Please fill all the fields")
      return;
    }
    try{
      const {data} = await axios.post('/api/users/login', {
        email: emailValue,
        password: passwordValue,
      });
      alert("Logged in Successfully")
      localStorage.setItem('token', data.token)
      localStorage.setItem("username", data.username)
      localStorage.setItem("userid", data.userid);
// console.log("Setting userid:", data.userid);

// // Log when retrieving userid
// const userid = localStorage.getItem("userid");
// console.log("Retrieved userid:", userid);
      setUser({ username: data.username, userid: data.userid });
      setIsLoggedIn(true);
      navigate("/")
      // console.log(data.token)
    }catch(error){
      alert(error?.response?.data?.msg)
      console.log(error.response)
    }

  }

  return (
  <LayOut className={classes.main}>
    <section className={classes.main_container}>
      <section className={classes.main_form}>
        <form onSubmit={handleSubmit}>
        <div className={classes.join}>
          <h1>Login to your account</h1>
        </div>
        <br />
        <div className={classes.account}>
          <small className={classes.sign}>
            Don't have an account?
            <Link to={'/register'}>Register</Link>
          </small>
        </div>

        <div>
          <input ref={emailDom} type="text" placeholder='Email Address'/>
        </div>
        <br />
        <div className={classes.password_container}>
          <input className={classes.password_input} ref={passwordDom} type={showPassword ? "text" : "password"} placeholder='Password'/>
        </div>
        <br />
        <div className={classes.buttonss}>
        <button type='button' className={classes.icons} onClick={TogglePassword}>{showPassword ? <MdOutlineVisibility /> : <AiOutlineEyeInvisible />}</button>
        </div>
        <br />
        <button type='submit'>Login</button>
        <div className={classes.closing_form}>
							<div className={classes.account}>
								<small>
									I agree to the <Link to="/Terms"> privacy policy</Link> and
									<Link to="/Terms"> terms of service.</Link>
								</small>
							</div>

							<br />
							<div className={classes.account}>
								<small>
									<Link to="/register">Create a new account?</Link>
								</small>
							</div>
						</div>
        </form>
    </section>
    <div className={classes.last_container}>
					<div>
						<div className={classes.About}>
							<small>About</small>
						</div>
						<div className={classes.QA}>	
							<h2>Evangadi Networks Q&A</h2>
						</div>
						<p>
							No matter what stage of life you are in, whether you’re just
							starting elementary school or being promoted to CEO of a Fortune
							500 company, you have much to offer to those who are trying to
							follow in your footsteps.
						</p>
						<br />
						<p>
							The right place to begin is by joining a network that will help
							you connect with mentors of your own, whether you are interested
							in sharing your knowledge or looking for mentors of your own. Your
							life experiences can provide much inspiration for others who are
							trying to follow in your footsteps, regardless of how old you are
							or what stage of life you are in.
						</p>
						<br />
						<p>
							Whether you are willing to share your knowledge or you are just
							looking to meet mentors of your own, please start by joining the
							network here.
						</p>
						<br />
						<button type="submit">How it works</button>
					</div>
				</div>
    </section>
  </LayOut>
  )
}

export default Login
