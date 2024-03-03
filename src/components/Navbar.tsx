import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.svg";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import Button from "./Button";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const useIsLoggedIn = () => {

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(user !== null);
      });
    }, []);

    return isLoggedIn;
  };

  const loggedin = useIsLoggedIn();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav id="navigation">
      <Link to="/">
        <img src={Logo} alt="logo" className="logo" />
      </Link>
      <div>
        <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
          {loggedin ? (
            <>
              <CustomeLink to="/admin-events">Events</CustomeLink>
              <CustomeLink to="/add-event">Add Event</CustomeLink>
            </>
          ) : (
            <>
              <CustomeLink to="/">Home</CustomeLink>
              <CustomeLink to="/events">Events</CustomeLink>
              <CustomeLink to="/about">About</CustomeLink>
            </>
          )}
          <CustomeLink
            to={loggedin ? "" : "/login"}
            id="loginbtn"
            click={loggedin ? logout : () => {}}
          >
            {loggedin ? "Logout" : "Login"}
          </CustomeLink>
        </ul>
      </div>
      <Button click={loggedin ? logout : () => {}} to="/login">
        {loggedin ? "Logout" : "Login"}
      </Button>
      <div id="mobile" onClick={handleClick}>
        <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </nav>
  );
}

export default Navbar;

function CustomeLink({ to, children, id , click}: any) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li id={id} onClick={click}>
      <Link to={to} className={isActive ? "active" : ""}>
        {children}
      </Link>
    </li>
  );
}
