import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalContext } from "../context/GlobalContext";
const Dashboard = () => {
  // const [userData, setUserData] = useState(null);
  const { userData, setUserData } = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const getUserData = async () => {
    // if (!userData?.id) return; // Ensure userData is available before fetching

    try {
      const response = await fetch(`http://localhost:3000/api/registerLogin/get`);
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []); // Run only when userData changes

  console.log("Dashboard Data:", dashboardData);

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div className="text-center mt-5">Loading user data...</div>;
  }

  return (
    <div className="container mt-5">
      {/* <h1>Dashboard</h1>
      <p><strong>Role:</strong> {userData.role}</p>
      <h3>User Information</h3>
      <ul className="list-group">
        <li className="list-group-item"><strong>ID:</strong> {userData.id}</li>
        <li className="list-group-item"><strong>Name:</strong> {`${userData.first_name} ${userData.middle_name} ${userData.last_name}`}</li>
        <li className="list-group-item"><strong>Email:</strong> {userData.email}</li>
        <li className="list-group-item"><strong>Tags:</strong> {userData.tags || "N/A"}</li>
        <li className="list-group-item"><strong>Gender:</strong> {userData.gender}</li>
        <li className="list-group-item"><strong>Description:</strong> {userData.description}</li>
        <li className="list-group-item"><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</li>
        <li className="list-group-item"><strong>Updated At:</strong> {new Date(userData.updatedAt).toLocaleString()}</li>
      </ul>

      {userData.role.toLowerCase().includes("admin") && (
        <div className="mt-3 alert alert-info">
          <strong>Admin Access:</strong> You have administrative privileges.
        </div>
      )}
      {userData.role.toLowerCase().includes("user") && (
        <div className="mt-3 alert alert-success">
          <strong>User Access:</strong> You have regular user privileges.
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;
