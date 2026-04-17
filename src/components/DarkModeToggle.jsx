import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function DarkModeToggle() {

  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="btn">
      {dark ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}

export default DarkModeToggle;