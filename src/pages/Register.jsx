import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext"; 

function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register } = useContext(AuthContext); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const validate = () => {
    const { username, email, password, confirmPassword } = form;

    if (!username || !email || !password || !confirmPassword) {
      return "All fields are required";
    }

    if (username.trim().length < 3) {
      return "Username must be at least 3 characters";
    }

    if (!email.includes("@")) {
      return "Enter a valid email";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }


    if (email === "admin@gmail.com") {
      return "This email is reserved for admin ❌";
    }

    return null;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }


    const userData = {
      username: form.username,
      email: form.email,
      password: form.password 
    };

    localStorage.setItem("user", JSON.stringify(userData));

    register(userData);

    setMessage("Registration successful 🎉");

    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="register-container">

      <motion.div
        className="card register-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >

        <h2 className="register-title">Create Account</h2>

        {error && <p className="error-msg">{error}</p>}
        {message && <p className="success-msg">{message}</p>}

        <form onSubmit={handleRegister} className="form">

          <input
            className="input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />


          <div className="password-box">
            <input
              className="input"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>


          <input
            className="input"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <motion.button
            className="btn register-btn"
            type="submit"
            whileTap={{ scale: 0.9 }}
          >
            Register
          </motion.button>

        </form>

        <p className="redirect-text">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="link"
          >
            Login
          </span>
        </p>

      </motion.div>

    </div>
  );
}

export default Register;