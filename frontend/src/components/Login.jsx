import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    // Handle login logic here
    try {
      const response = await fetch(
        "http://localhost:3000/api/registerLogin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        // Handle login success (e.g., redirect to dashboard)
        setUserData(data?.user);
        navigate("/dashboard");
      } else {
        alert(data.error || "Login failed!");
      }
    } catch (error) {
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center mb-0">Login</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <Link to="/register">
              If You Don't have an Account Please Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
