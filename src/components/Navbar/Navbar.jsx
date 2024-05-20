import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import search from "../../assets/search.png";
import { useEffect, useState } from "react";
// import { Menubar } from "primereact/menubar";

// const items = [
//   {
//     label: "Academics",
//     icon: "pi pi-search",
//     items: [
//       {
//         label: "Class Management",
//         icon: "pi pi-star",
//         items: [
//           {
//             label: "Create New Class",
//             icon: "pi pi-palette",
//           },
//           {
//             label: "List Of Classes",
//             icon: "pi pi-palette",
//           },
//         ],
//       },
//       {
//         label: "Subject Management",
//         icon: "pi pi-star",
//         items: [
//           {
//             label: "Create New Subject",
//             icon: "pi pi-palette",
//           },
//           {
//             label: "List Of Subjects",
//             icon: "pi pi-palette",
//           },
//         ],
//       },
//     ],
//   },
// ];

const Navbar = () => {
  const [user, setUser] = useState("");
  const [drop, setDrop] = useState(false);
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user?.username);
  }, []);

  return (
    <>
      <header>
        <div className="navbar">
          <div className="nav-logo  border">
            <div className="logo"></div>
          </div>

          <div className="nav-search">
            <select name="" id="" className="search-select">
              <option value="">All</option>
              <option value="student">Student</option>
              <option value="class">Class</option>
              <option value="subject">Subject</option>
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <div className="search-icon">
              <img src={search} alt="" width={20} />
            </div>
          </div>

          <div className="nav-username border">
            <p>Hello, {user?.toUpperCase()}</p>
          </div>

          <div>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                nav("/", { replace: true });
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {/* <div className="card">
            <Menubar model={items} />
          </div> */}

        <div className="panel">
          <div className="panel-ops">
            <p onClick={() => nav("/home")}>Home</p>
            <p onClick={() => setDrop3(!drop3)}>Student</p>
            <p onClick={() => setDrop(!drop)}>Academics</p>
          </div>
        </div>
      </header>

      {drop && (
        <div className="dropdown0">
          <p
            onClick={() => {
              setDrop1(true);
            }}
          >
            Class Management
          </p>
          <p
            onClick={() => {
              setDrop2(true);
            }}
          >
            Subject Management
          </p>
        </div>
      )}

      {drop1 && (
        <div className="dropdown0">
          <p
            onClick={() => {
              setDrop(false);
              setDrop1(false);
              nav("/home/add_class");
            }}
          >
            Create New Class
          </p>
          <p
            onClick={() => {
              setDrop(false);
              setDrop1(false);
              nav("/home/list_class");
            }}
          >
            List of classes
          </p>
        </div>
      )}

      {drop2 && (
        <div className="dropdown0">
          <p
            onClick={() => {
              setDrop(false);
              setDrop1(false);
              setDrop2(false);
              nav("/home/add_subject");
            }}
          >
            Create New Subject
          </p>
          <p
            onClick={() => {
              setDrop(false);
              setDrop1(false);
              setDrop2(false);
              nav("/home/list_subject");
            }}
          >
            List of Subjects
          </p>
        </div>
      )}
      {drop3 && (
        <div className="dropdown1">
          <p
            onClick={() => {
              setDrop(false);
              setDrop1(false);
              setDrop2(false);
              nav("/home/student");
              setDrop3(false);
            }}
          >
            Create New Student
          </p>
          <p
            onClick={() => {
              setDrop(false);
              setDrop1(false);
              setDrop2(false);
              setDrop3(false);
              nav("/home/list_student");
            }}
          >
            List of Students
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;
