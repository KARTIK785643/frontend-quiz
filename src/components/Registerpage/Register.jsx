import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate from react-router-dom
import axios from "axios";
import "./reg.css";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // ✅ Add state to track registration success
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!user.username || !user.email || !user.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-myquiz-1.onrender.com/register", // Use your backend URL here
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("📩 Registration response:", response.data);

      if (response.data.message === "User registered successfully!") {
        setIsRegistered(true); // ✅ Set isRegistered to true on successful registration
      }
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data);
      setError(err.response?.data?.error || "Registration failed!");
    }
  };

  // ✅ useEffect hook to navigate after state change
  useEffect(() => {
    if (isRegistered) {
      navigate("/login"); // Navigate to login page after successful registration
    }
  }, [isRegistered, navigate]);

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
