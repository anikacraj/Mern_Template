import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./UserLogin.css";
function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2008/login", { email, password })
      .then((result) => {
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
    <section className="login-section">
      <div className="shape-bottom">
        <svg
          fill="#fff"
          viewBox="0 0 1921 819.8"
          style={{ enableBackground: "new 0 0 1921 819.8" }}
        >
          <path
            d="M1921,413.1v406.7H0v0.5h0.4l128.1,598.3c30.74,4.8,80.8,130.6,152.5,168.6c107.6,57.2,112.1,40.7,245.7,34.4
            c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
          />
        </svg>
      </div>
      <div className="login-box card p-3 shadow border-0">
        <div className="text-center">
          <img src="" alt="Logo" className="logo" />
        </div>
        <form className="mt-3" onSubmit={handleSubmit}>
          <h2>Sign In</h2>

          <div className="form-group">
            <TextField
              variant="standard"
              label="Email"
              type="email"
              required
              className="textfield-custom w-100"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextField
              variant="standard"
              label="Password"
              type="password"
              required
              className="textfield-custom w-100"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#" className="border-effect cursor txt">
            Forget Password?
          </a>
          <div className="button-container d-flex align-items-center mt-3 mb-3">
            <Button type="submit" className="btn-blue col btn-lg btn-big">
              Sign In
            </Button>
            <Link to="/">
              <Button
                className="btn-cancel btn-lg btn-big col ml-3"
                variant="outlined"
              >
                Cancel
              </Button>
            </Link>
          </div>
          <p className="txt">
            Not Registered?{" "}
            <Link className="link" to="/register" >
              Sign Up
            </Link>
          </p>
          <h6 className="mt-4 text-center font-weight-bold">
            Or continue with social account
          </h6>
          <Button className="loginWithGoogle">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFOuaRWrmN_tJfIjNd6do_8sfaKh9IPNJ8Q&s"
              alt="Google Login"
              className="google-btn-img"
            />
          </Button>
        </form>
      </div>
    </section>
  );
}

export default UserLogin;
