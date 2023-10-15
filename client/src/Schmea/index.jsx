import * as yup from "yup";

export const signschema = yup.object({
  name: yup.string().min(3).max(25).required("Please enter your name"),
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(6).required("Please enter your password"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

export const loginschema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(6).required("Please enter your password"),
});

    