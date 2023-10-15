import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Slices/UserSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchdata() {
      await axios.get("http://localhost:5000/api/users/userinfo", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    }
    fetchdata();
  }, [localStorage.getItem("token")]);

  const data = useSelector((state) => state.user);
  const { email, password, username } = data;

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{<Skeleton /> || data.user.username}</span>
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
