import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useFormik } from "formik";
import { forgetpasswordschema } from "../../Schmea";
import { Link } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_API;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        resetForm({ values: "" });
        setLoading(true);
        const res = await axios.post(
          SERVER_URL + "/api/users/forgotpassword",
          values
        );
        setLoading(false);
        setSuccess(true);
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err.response.data.error);
        resetForm({ values: "" });
        setLoading(false);
        setError(err.response.data.error);
      }
    },
    validationSchema: forgetpasswordschema,
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
        </div>
      ) : (
        <div className="form_container">
          {error ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {" "}
              <p className="form_error" style={{ fontSize: "1.2rem" }}>
                {error}
              </p>
              <button onClick={() => setError("")}>Close</button>
            </div>
          ) : success ? (
            <p className="form_success">
              Reset Password Link Sent to your email
              <Link to="/login" className="form_link">
                Login
              </Link>
            </p>
          ) : (
            <>
              {" "}
              <h2>Forgot Password</h2>
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
                <button type="submit">Submit</button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
