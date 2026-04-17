import React, { useContext, useState } from "react"; 
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const username = user?.username || "";
  const isAdmin = user?.role === "admin"; 

  const closeMenu = () => setMenuOpen(false); 

  return (

    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >


      <motion.h2
        whileHover={{ scale: 1.1 }}
        className="logo"
        onClick={() => {
          navigate("/home");
          closeMenu();
        }}
      >
        ZenithCMS
      </motion.h2>


      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>


      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <NavLink to="/home" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
        <NavLink to="/create" onClick={closeMenu}>Create</NavLink>

      </div>


      <div className={`nav-actions ${menuOpen ? "active" : ""}`}>


        {user && (
          <span className="username">
            {username}
            {isAdmin && (
              <span style={{
                marginLeft: "6px",
                color: "gold",
                fontSize: "12px"
              }}>
                
              </span>
            )}
          </span>
        )}


        <DarkModeToggle />


        {user && (
          <motion.button
            className="btn btn-danger"
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
          >
            Logout
          </motion.button>
        )}

      </div>

    </motion.nav>
  );
}

export default Navbar;