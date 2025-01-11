import React, { useState } from "react";
// import Style from "./style.css";
import Register from "./components/Register"; // Ensure correct path
import Login from "./components/Login";
import Dashboard from "./components/Dashboards";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="App">
      {/* {!isRegistered ? (
        <Register onRegisterSuccess={() => setIsRegistered(true)} />
      ) : (
        <Login /> 
      )} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
