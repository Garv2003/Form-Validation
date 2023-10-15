import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Compoments/Login/Login";
import Signup from "./Compoments/Signup/Signup";
import Home from "./Compoments/Home/Home";
import ApiProvider from "./Context/ApiState";

const App = () => {
  return (
    <>
      <ApiProvider>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("info") ? <Home /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ApiProvider>
    </>
  );
};

export default App;
