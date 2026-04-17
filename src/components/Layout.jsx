import React from "react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";

function Layout({ children, loading = false }) {

  return (

    <div className="app-layout">

      <Navbar />

      <AnimatePresence>
        {loading && (
          <motion.div
            className="global-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        className="container"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>

    </div>

  );
}

export default Layout;