import axios from "axios";
import { useEffect, useState } from "react";

const ListOfSubject = () => {
  const [userData, setUserData] = useState([]);

  const getSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/subject/subjects");
      const data = await res.data;
      setUserData(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getSubjects();
  }, [userData.length]);

  return (
    <div>
      <div>
        <h2 className="head" style={{ textAlign: "center", color: "#00ff00" }}>
          List of Classes
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Subject Name</th>
              <th>Medium</th>
              <th>Teacher Name</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.id || index} style={{ textAlign: "center" }}>
                <td>{index + 1}</td>
                <td>{user.subjectName}</td>
                <td>{user.medium}</td>
                <td>{user.teacherName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfSubject;
