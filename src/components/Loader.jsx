import React from "react";
import { motion } from "framer-motion";

function Loader() {

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "var(--bg-main)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >

      <div style={{
        position: "relative",
        width: "140px",
        height: "140px"
      }}>

        <motion.div
          style={{
            position: "absolute",
            width: "140px",
            height: "140px",
            border: "4px solid transparent",
            borderTop: "4px solid var(--accent)",
            borderRadius: "50%",
            boxShadow: "0 0 20px var(--accent)"
          }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            top: "20px",
            left: "20px",
            border: "3px solid transparent",
            borderRight: "3px solid var(--accent)",
            borderRadius: "50%"
          }}
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear"
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            width: "70px",
            height: "70px",
            top: "35px",
            left: "35px",
            border: "2px solid transparent",
            borderBottom: "2px solid var(--accent)",
            borderRadius: "50%"
          }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "linear"
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            width: "30px",
            height: "30px",
            top: "55px",
            left: "55px",
            background: "var(--accent)",
            borderRadius: "50%",
            boxShadow: "0 0 30px var(--accent)"
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 1
          }}
        />

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              background: "var(--accent)",
              borderRadius: "50%",
              top: "50%",
              left: "50%"
            }}
            animate={{
              x: Math.cos(i * 60 * Math.PI / 180) * 60,
              y: Math.sin(i * 60 * Math.PI / 180) * 60,
              opacity: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.2
            }}
          />
        ))}

      </div>

      <motion.p
        style={{
          marginTop: "30px",
          color: "var(--text-main)",
          fontSize: "16px",
          letterSpacing: "1px"
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        Loading ZenithCMS...
      </motion.p>

    </motion.div>
  );
}

export default Loader;