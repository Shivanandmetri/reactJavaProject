import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;
    if (!token) {
      nav("/");
    }
  }, []);
  return (
    <div className="home">
      <marquee>
        <h1 style={{
          color:"#B213EE"
        }}>
          Well Come To <span style={{ color: "#EE1331" }}> Buffer Zero</span>
        </h1>
      </marquee>
    </div>
  );
};

export default Home;
