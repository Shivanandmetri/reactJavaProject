import { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";

const ListOfClasses = () => {
  const [userData, setUserData] = useState([]);
  const [msg, setMessage] = useState(null);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/section/sections");
      const data = await res.data;
      setUserData(data);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [userData.length]);

  // console.log(userData);

  return !msg ? (
    <div>
      <h2 className="head" style={{ textAlign: "center", color: "#C70039" }}>
        List of Classes
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Class Name</th>
            <th>Class Teacher Name</th>
            <th>Academic Year</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user.id || index} style={{ textAlign: "center" }}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.teacherName}</td>
              <td>{user.academicYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p
      style={{
        color: "red",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
      }}
    >
      {msg}
    </p>
  );
};

export default ListOfClasses;
