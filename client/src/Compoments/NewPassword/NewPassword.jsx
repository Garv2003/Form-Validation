import { useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useFormik } from "formik";
import { newpasswordschema } from "../../Schmea";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();

  const token = query.get("token");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        resetForm({ values: "" });
        setLoading(true);
        const res = await axios.post(
          import.meta.env.VITE_APP_SERVER_API + "/api/users/resetpassword",
          {
            password: values.password,
            token: token,
          }
        );
        setSuccess(true);
        toast.success(res.data.message);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.error);
        resetForm({ values: "" });
        setLoading(false);
        setError(err.response.data.error);
      }
    },
    validationSchema: newpasswordschema,
  });

  return (
    <>
      <Helmet>
        <title>New Password</title>
        <meta name="description" content="New Password Page" />
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
        </div>
      ) : (
        <div className="form_container">
          {error ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <p className="form_error">{error}</p>
              <Link to="/forgotpassword" className="form_link">
                Forgot Password
              </Link>
            </div>
          ) : success ? (
            <p className="form_success">
              Your password has been reset successfully
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
                <div>
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmpassword"
                    autoComplete="off"
                    value={formik.values.confirmpassword}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.confirmpassword &&
                  formik.touched.confirmpassword ? (
                    <p className="form_error">
                      {formik.errors.confirmpassword}
                    </p>
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

export default NewPassword;
