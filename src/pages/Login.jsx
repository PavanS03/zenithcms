import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please enter all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {


      if (email === "admin@gmail.com") {

        if (password !== "admin123") {
          setError("Invalid admin password ❌");
          setLoading(false);
          return;
        }

        login({
          username: "Admin",
          email: email
        });

        setMessage("Admin login successful ");

      } else {


        const userData = {
          username: email.split("@")[0],
          email: email
        };

        login(userData);

        setMessage("Login successful 🎉");
      }

      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    }, 800);
  };

  return (

    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>

      {loading && <Loader />}

      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%",
          maxWidth: "360px",
          backdropFilter: "blur(10px)"
        }}
      >

        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Welcome Back 
        </h2>


        {error && (
          <motion.p
            className="error-msg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}


        {message && (
          <motion.p
            className="success-msg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />


          <div style={{ position: "relative" }}>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "12px",
                cursor: "pointer",
                color: "var(--accent)"
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>

          </div>


          <motion.button
            className="btn"
            type="submit"
            whileTap={{ scale: 0.9 }}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "10px",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

        </form>


        <p style={{ marginTop: "12px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <span
            style={{
              color: "var(--accent)",
              cursor: "pointer",
              fontWeight: "bold"
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </motion.div>

    </div>
  );
}

export default Login;