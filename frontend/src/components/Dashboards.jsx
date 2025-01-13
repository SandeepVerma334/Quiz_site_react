import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for toggler

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar hidden initially

  // Fetch user data for Admin
  const getUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/registerLogin/get`);
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/registerLogin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("UserAuth")}`,
        },
        body: JSON.stringify({ id: userData.id }),
      });

      if (!response.ok) throw new Error("Failed to logout");
      alert("Logout successful!");
      setUserData(null);
      Cookies.remove("UserAuth");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!userData) {
      navigate("/");
    } else if (userData.role === "Admin") {
      getUserData();
    } else {
      setDashboardData([userData]);
    }
  }, [userData]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div className="text-center mt-5">Loading user data...</div>;
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-dark text-white sidebar ${
          isSidebarOpen ? "d-block" : "d-none d-md-block"
        }`}
        style={{ width: isSidebarOpen ? "250px" : "0", minHeight: "100vh" }}
      >
        <h5>Dashboard Menu</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Settings
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Profile
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <button className="btn btn-primary mb-3" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h2>{userData.role === "Admin" ? "Admin Dashboard" : "User Dashboard"}</h2>

        <button type="button" className="btn btn-primary mb-3" onClick={logout}>
          Logout
        </button>

        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.middle_name || "-"}</td>
                <td>{user.last_name || "-"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.gender || "-"}</td>
                <td>{user.description || "-"}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
