import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { signschema } from "../../Schmea";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Signup = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(
          import.meta.env.VITE_APP_SERVER_API + "/api/users/register",
          values
        );
        if (res.status === 201 || res.status === 200) {
          toast.success("Account Created Successfully");
          formik.resetForm();
          setLoading(false);
          navigate("/login");
          return;
        } else if (res.status === 400) {
          toast.error("Invalid Credentials");
        } else if (res.status === 404) {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        setLoading(false);
      }
    },
    validationSchema: signschema,
    console,
  });

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta name="description" content="Signup Page" />
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
          <div>Signing In</div>
        </div>
      ) : (
        <div className="form_container">
          <h2>Signup Account</h2>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="form_error">{formik.errors.email}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                placeholder="Enter your username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="form_error">{formik.errors.name}</p>
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
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="form_error">{formik.errors.password}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="confirm password">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                autoComplete="off"
                value={formik.values.confirmpassword}
                placeholder="Enter your confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.confirmpassword &&
              formik.touched.confirmpassword ? (
                <p className="form_error">{formik.errors.confirmpassword}</p>
              ) : null}
            </div>
            <button type="submit">Submit</button>
            <span>
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
