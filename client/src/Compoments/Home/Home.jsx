import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_API;

const Home = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      await axios
        .get(SERVER_URL+"/api/users/userinfo", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setdata(res.data.user);
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
          Welcome <span>{data.name}</span>
          <div>{data.email}</div>
        </h4>
        <button
          onClick={() => {
            localStorage.removeItem("token");
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
