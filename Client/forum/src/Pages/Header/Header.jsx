import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Evangadi from "../../Assets/evangadi-logo-5fea54cc.png";
import { AppState } from "../../App";

function Header() {
  const { user, isLoggedIn, handleLogout } = useContext(AppState);
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout(); // Call handleLogout directly when the button is clicked
    navigate("/login"); // Redirect to the login page after logout
  };


  return (
    <div className={classes.main_container}>
      <div className={classes.Header_Part}>
        <div className={classes.Logo}>
          <Link to={isLoggedIn ? "/" : "/"}>
            <img src={Evangadi} alt="Evangadi Logo" />
          </Link>
        </div>
        <div className={classes.both}>
        <div className={classes.Menu}>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <li>How it Works</li>
          </ul>
        </div>
        <div className={classes.button}>
          {isLoggedIn ? (
            <button className={classes.styled_button} onClick={handleSignOut}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className={classes.styled_button}>Log In</button>
            </Link>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
