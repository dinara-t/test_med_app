import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserMd } from 'react-icons/fa';
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        window.location.reload();
    };

    useEffect(() => { 
      const storedEmail = sessionStorage.getItem("email");
      if (storedEmail) {
            setIsLoggedIn(true);
            const username = storedEmail.split("@")[0];
            setUserName(username);
          }
    }, []);

    const handleDropdownClick = () => setDropdownOpen(!dropdownOpen);

    return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <FaUserMd style={{color:'#2190FF'}} />
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>
        <li className="link">
          <Link to="/instant-consultation" onClick={() => navigate("/search/doctors")}>
            <button className="btn1">Booking</button>
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="link dropdown">
              <span className="welcome-user" onClick={handleDropdownClick}>
                Welcome, {userName} <i className="fa fa-caret-down"></i>
              </span>
              <ul className={dropdownOpen ? 'dropdown-menu active' : 'dropdown-menu'}>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button className="btn2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;