import React from "react";
import { motion } from "framer-motion";

function Pagination({ totalPosts, postsPerPage, currentPage, setCurrentPage }) {

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      flexWrap: "wrap",
      gap: "10px"
    }}>

      <motion.button
        className="btn"
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ⬅ Prev
      </motion.button>

      {pages.map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentPage(page)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background:
              currentPage === page ? "var(--accent)" : "var(--bg-secondary)",
            color:
              currentPage === page ? "black" : "var(--text-main)"
          }}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        className="btn"
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next ➡
      </motion.button>

    </div>

  );
}

export default Pagination;