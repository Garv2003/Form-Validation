import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useFormik } from "formik";
import { loginschema } from "../../Schmea";
import { Helmet } from "react-helmet";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        resetForm({ values: "" });
        setLoading(true);
        const res = await axios.post(
          import.meta.env.VITE_APP_SERVER_API + "/api/users/login",
          values
        );
        toast.success("Login Successfull");
        setTimeout(() => {
          localStorage.setItem("token", res.data.token);
          window.location.assign("/");
        }, 2000);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.error);
        resetForm({ values: "" });
        setLoading(false);
      }
    },
    validationSchema: loginschema,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>
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
                autoComplete="on"
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
                value={formik.values.password}
                placeholder="Enter your password"
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="form_error">{formik.errors.password}</p>
              ) : null}
            </div>
            <Link to="/forgot" className="forgot_password">
              Forgot Password?
            </Link>
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
