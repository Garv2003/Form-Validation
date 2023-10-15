import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Slices/UserSlice";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const res = axios.get("http://localhost:5000/api/users/login", {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
  }, []);

  const data = useSelector((state) => state.user);
  const { email, password, username } = data;

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{data.user.username}</span>
          {data.password}
          {console.log(data)}
        </h4>
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default Home;
