import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import "./Login.css";
import jwt_decode from "jwt-decode";
import { login } from "../../store/Slices/UserSlice";
import ApiContext from "../../Context/ApiContext";
import { useFormik } from "formik";
import { loginschema } from "../../Schmea";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = React.useContext(ApiContext);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await axios.post("http://localhost:5000/api/users/login", values);
      console.log(res);
      formik.resetForm();
    },
    validationSchema: loginschema,
  });

  // var token =
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTVlNGZjYTAxOGMzNjYxNWRjOWQxYiIsIm5hbWUiOiJHYXJ2IEFnZ2Fyd2FsIiwiaWF0IjoxNjk2MTAzOTk5LCJleHAiOjE3Mjc2NjA5MjV9.i-vfS7fsiQJbyBuUosapyGhGDhw3EpPuTx9AYaPmx0U";
  // var decoded = jwt_decode(token);
  // console.log(decoded);

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={formik.values.email}
            placeholder="Enter your email"
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="form_error">{formik.errors.email}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={formik.values.password}
            placeholder="Enter your password"
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="form_error">{formik.errors.password}</p>
          ) : null}
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
