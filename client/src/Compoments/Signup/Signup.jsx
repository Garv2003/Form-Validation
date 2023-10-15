import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signschema } from "../../Schmea";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: async (values) => {
      try {
        await axios
          .post("http://localhost:5000/api/users/register", values)
          .then((res) => {
            console.log(res);
            formik.resetForm();
          });
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: signschema,
    console,
  });

  return (
    <div className="form_container">
      <ToastContainer />
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
          {formik.errors.confirmpassword && formik.touched.confirmpassword ? (
            <p className="form_error">{formik.errors.confirmpassword}</p>
          ) : null}
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
