import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import "./Login.css";
import ApiContext from "../../Context/ApiContext";
import { useFormik } from "formik";
import { loginschema } from "../../Schmea";

const Login = () => {
  const api = React.useContext(ApiContext);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      resetForm({ values: "" });
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        values
      );
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        window.location.assign("/");
      } else if (res.status === 400) {
        toast.error(res.data.message);
      } else {
        toast.error("Something went wrong");
      }
      setLoading(false);
    },
    validationSchema: loginschema,
  });

  return (
    <>
      {loading ? (
        <div className="loading">
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
          <div>logging In</div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Login;
