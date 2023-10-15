import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout, login } from "../../store/Slices/UserSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchdata() {
      await axios
        .get("http://localhost:5000/api/users/userinfo", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          dispatch(login({ payload: res.data.user }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchdata();
  }, []);

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{data.name}</span>
          <div>{data.email}</div>
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
