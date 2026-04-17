import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {

  const navigate = useNavigate();

  return (
    <div className="welcome-container">

      <motion.div
        className="bg-glow"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity
        }}
      />

      <motion.div
        className="welcome-card"
        initial={{ opacity: 0, scale: 0.85, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <motion.h1
          className="welcome-title"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ZenithCMS 
        </motion.h1>

        <motion.p
          className="welcome-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Create. Manage. Scale — Your Content, Your Control.
        </motion.p>

        <motion.div
          className="btn-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >

          <motion.button
            className="btn primary"
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px #00FFC2" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/login")}
          >
            Login
          </motion.button>

          <motion.button
            className="btn secondary"
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px #00FFC2" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/register")}
          >
            Register
          </motion.button>

        </motion.div>

      </motion.div>

    </div>
  );
}

export default Welcome;