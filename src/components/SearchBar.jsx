import React, { useEffect } from "react";
import { motion } from "framer-motion";

function SearchBar({ search, setSearch }) {

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSearch("");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setSearch]);

  return (

    <motion.div
      className="search-bar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {search && (
        <motion.button
          className="clear-btn"
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setSearch("")}
        >
          ✖
        </motion.button>
      )}

    </motion.div>
  );
}

export default SearchBar;