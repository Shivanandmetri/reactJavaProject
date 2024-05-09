import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Auth.css";

const Auth = () => {
  return (
    <div className="maincontainer">
      <div className="navbarstyle">
        <Navbar />
      </div>
      <div className="midcontainer">
        <Outlet />
      </div>
      <div className="footer">
        <h4 style={{ color: "white" }}>
          © 2024. BufferZero Business Solutions Pvt Ltd. All Rights Reserved
        </h4>
      </div>
    </div>
  );
};

export default Auth;
