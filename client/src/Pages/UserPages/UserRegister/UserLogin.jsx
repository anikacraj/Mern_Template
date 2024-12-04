import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2004/login", { email, password })
      .then((result) => {
        console.log(result);
        const { status, role, message } = result.data;
        if (status === "success") {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem(
            "user",
            JSON.stringify({ email, loginDate: new Date().toISOString() })
          );
          navigate("/"); // Redirect to the homepage
        } else {
          alert(message || "Login failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div>
      <div>
        <img src="../../Media/red.png" alt="" />
      </div>
      <div>
        <h3>Log In</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default UserLogin;
