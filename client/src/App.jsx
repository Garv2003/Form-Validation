import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Compoments/Login/Login";
import Signup from "./Compoments/Signup/Signup";
import Home from "./Compoments/Home/Home";
import ForgotPassword from "./Compoments/ForgotPassword/ForgotPassword";
import NewPassword from "./Compoments/NewPassword/NewPassword";

import ApiProvider from "./Context/ApiState";

const App = () => {
  return (
    <>
      <ApiProvider>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<NewPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ApiProvider>
    </>
  );
};

export default App;
