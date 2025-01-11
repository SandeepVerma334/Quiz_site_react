import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    inputTags: "",
    role: "",
    gender: "",
    description: "",
    password: "",
    confirm_password: "",
  });
  const navigate=useNavigate()
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(""); // For backend responses

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First Name is required.";
    if (!formData.last_name) newErrors.last_name = "Last Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "A valid email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // API request
        const response = await fetch(
          "http://localhost:3000/api/registerLogin/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: formData.first_name,
              middle_name: formData.middle_name,
              last_name: formData.last_name,
              email: formData.email,
              inputTags: formData.inputTags,
              role: formData.role,
              gender: formData.gender,
              description: formData.description,
              password: formData.password,
              confirm_password: formData.confirm_password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Success
          setServerMessage("Registration successful!");
          alert("Registration successful!");
          setFormData({
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            inputTags: "",
            role: "",
            gender: "",
            description: "",
            password: "",
            confirm_password: "",
          });
          navigate("/")
          setErrors({});
        } else {
          // API error
          setServerMessage(data.error || "Something went wrong!");
        }
      } catch (error) {
        // Network error
        setServerMessage("Failed to connect to the server.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center mb-0">Register</h3>
        </div>
        <div className="card-body">
          {serverMessage && (
            <div
              className={`alert ${
                serverMessage.includes("successful")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {serverMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {errors.first_name && (
                <div className="text-danger">{errors.first_name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="middle_name" className="form-label">
                Middle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="middle_name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              {errors.last_name && (
                <div className="text-danger">{errors.last_name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="inputTags" className="form-label">
                Tags
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTags"
                name="inputTags"
                value={formData.inputTags}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
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
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
              {errors.confirm_password && (
                <div className="text-danger">{errors.confirm_password}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <Link to="/">If You have an Account Please Login</Link>

            {/* <p>
              Already have an account?
              <a href="./login.jsx">Login</a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
