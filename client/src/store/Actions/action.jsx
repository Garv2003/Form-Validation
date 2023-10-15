// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router";
// import { createContext, useEffect, useState } from "react";

// export const ApiContext = createContext();


// export const ApiProvider = ({ childern }) => {
//   const [Email, setEmail] = useState("");
//   const [Username, setUsername] = useState("");
//   const [Password, setPassword] = useState("");
//   const [ConPassword, setConPassword] = useState("");

//   useEffect(() => {

//   }, []);

  
// const navigate = useNavigate();

//   const loginapi = async (inputValue, navigate, removeCookie, seterror1) => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/auth/login",
//         inputValue,
//         { withCredentials: true }
//       );
//       const { status, user } = data;
     
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const signupapi = async (inputValue, navigate, removeCookie, seterror1) => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/auth/signup",
//         inputValue,
//         { withCredentials: true }
//       );
//       const { status, user } = data;
     
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const verifyCookie = async (cookies, navigate, removeCookie, setUsername) => {
//     if (!cookies.token) {
//       navigate("/login");
//     }
//     console.log(cookies);
//     const { data } = await axios.post(
//       "http://localhost:8080/auth/verify",
//       {},
//       { withCredentials: true }
//     );
//     const { status, user } = data;
//     setUsername(user);
   
//   };
//   const Logout = (removeCookie, navigate) => {
//     removeCookie("token");
//     navigate("/login");
//   };

//   return (
//     <ApiContext.Provider value={{ Email, setEmail, Username, setUsername }}>
//       {childern}
//     </ApiContext.Provider>
//   );
// };
