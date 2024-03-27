import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_API;

const Home = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      setloading(true);
      await axios
        .get(SERVER_URL + "/api/users/userinfo", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.status === false) {
            setloading(false);
            toast.error("Session Expired, Please Login Again");
            localStorage.removeItem("token");
            navigate("/login");
          }
          setdata(res.data.user);
          setloading(false);
        })
        .catch((err) => {
          seterror("Something went wrong" + err);
          setloading(false);
        });
    }
    fetchdata();
  }, []);

  return (
    <>
      <div className="home_page">
        {loading ? (
          <h5 style={{ textAlign: "center" }}>
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
            <div>Loading...</div>
          </h5>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>
            <h4>
              Welcome <span>{data?.name}</span>
              <div>{data?.email}</div>
            </h4>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                toast.success("Logout Successfull");
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              }}
            >
              LOGOUT
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
