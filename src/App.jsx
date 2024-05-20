import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ClassComponent from "./components/ClassManagement";
import Home from "./pages/Home";
import Auth from "./AuthLayout/Auth";
import { UserProvider } from "./context/userContext";
import "./App.css";
import SubjectManagement from "./components/SubjectManagement";
import ListOfClasses from "./components/ListOfClasses";
import ListOfSubject from "./components/ListOfSubject";
import Student from "./components/Student";
import ListOfStudents from "./components/ListOfStudents";
// import { PrimeReactProvider } from "primereact/api";
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add_class",
        element: <ClassComponent />,
      },
      {
        path: "list_class",
        element: <ListOfClasses />,
      },
      {
        path: "add_subject",
        element: <SubjectManagement />,
      },
      {
        path: "list_subject",
        element: <ListOfSubject />,
      },
      {
        path: "student",
        element: <Student />,
      },
      {
        path: "list_student",
        element: <ListOfStudents />,
      },
    ],
  },
]);

// const value = {
//   appendTo: "self",
// };

function App() {
  return (
    // <PrimeReactProvider value={value}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    // </PrimeReactProvider>
  );
}

export default App;
