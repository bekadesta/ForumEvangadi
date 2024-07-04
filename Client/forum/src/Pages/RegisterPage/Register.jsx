import React, { useRef, useContext, useState } from 'react'
import axios from '../../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'; 
import classes from "./Register.module.css"
import LayOut from '../../Layout/LayOut';
import { AppState } from '../../App'

function Register() {
  const { setUser, setIsLoggedIn } = useContext(AppState);
  const navigate = useNavigate()
  const usernameDom = useRef()
  const firstnameDom = useRef()
  const lastnameDom = useRef()
  const emailDom = useRef()
  const passwordDom = useRef()
  const [showLoginMessage, setShowLoginMessage] = useState(false)
  
  async function handleSubmit(e) {
    e.preventDefault()
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    

    if (!usernameValue || !firstValue || !lastValue || !emailValue || !passwordValue) {
      alert("Please fill in all the fields")
      return;
    }

    try {
      const { data } = await axios.post('/users/register', {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passwordValue,
      });

      alert('Registration Successful');
      localStorage.setItem('token', data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userid", data.userid);
      setUser({ username: data.username, userid: data.userid });
      setIsLoggedIn(true);
      setShowLoginMessage(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      // navigate('/login');

    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data);
        alert(error.response.data.message || "Mmmm. Something Went Wrong");
      } else {
        alert("Mmmm. Something Went Wrong");
      }
    }
  }

  return (
    <LayOut className={classes.main}>
      <section className={classes.main_container}>
        <section className={classes.form}>
          <form onSubmit={handleSubmit}>
            <div className={classes.join}> 
              <h2>Join The Network</h2>
            </div>
            <div className={classes.account}>
              <small className={classes.sign}>
                Already have an account? <Link to="/login"> Sign In </Link>
              </small>
            </div>

            <div>
              <input ref={usernameDom} 
              type="text"
              placeholder='Username'/>
            </div>
            <br />
            <div className={classes.names}>
              <input ref={firstnameDom} type="text" placeholder='First Name'/>
              <input ref={lastnameDom}type="text" placeholder='Last Name'/>
            </div>
            <br />       
            <div>
              <input 
              ref={emailDom}
              type="text" 
              placeholder='Email Address'/>
            </div>
            <br />
            <div>
              <input ref={passwordDom} type="password" placeholder='Password'/>
            </div>
            <button className={classes.buttons} type='submit'>Agree and Join</button>
            {showLoginMessage && (
              <small className={classes.loginPrompt}>
                Now login with your new account!
              </small>
            )}
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
									<Link to="/login">Already have an account?</Link>
								</small>
							</div>
						</div>
          </form>
        </section>
        <div className={classes.last_container}>
					<div>
						<div className={classes.About}>
							<h3>About</h3>
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

export default Register
