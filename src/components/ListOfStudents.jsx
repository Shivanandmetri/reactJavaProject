import axios from "axios";
import { useEffect, useState } from "react";

const ListOfStudents = () => {
  const [userData, setUserData] = useState([]);
  const [msg, setMessage] = useState(null);

  const getStudentDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/student/getStudents"
      );
      const data = await res.data;
      setUserData(data);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  // console.log(userData);
  useEffect(() => {
    getStudentDetails();
  }, [userData.length]);

  return !msg ? (
    <div>
      <h2 className="head" style={{ textAlign: "center", color: "#00ff00" }}>
        List of Students
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Father Name</th>
            <th>Mother Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>MOB No</th>
            <th>Gender</th>
            {/* <th>Religion</th>
            <th>Sats ID</th>
            <th>Caste</th>
            <th>Aadhaar No</th>
            <th>Address</th>
            <th>School</th>
            <th>Section</th> */}
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user.id || index} style={{ textAlign: "center" }}>
              <td>{index + 1}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.fathername}</td>
              <td>{user.mothername}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>{user.contact}</td>
              <td>{user.gender}</td>
              {/* <td>{user.religion}</td>
              <td>{user.satsid}</td>
              <td>{user.caste}</td>
              <td>{user.adhaarNo}</td>
              <td>{user.address}</td>
              <td>{user.school}</td>
              <td>{user.section}</td> */}
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

export default ListOfStudents;
