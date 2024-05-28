import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import { Formik } from "formik";
import axios from "axios";
import {useEffect, useState } from "react";
import "../App.css";

const loginFields = [
  {
    type: "text",
    placeholder: "User Name",
    name: "username",
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];
function Login() {
  const [msg, setMessage] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const nav = useNavigate();

  const userLogin = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    // const headers = {
    //   "Content-Type": "application/json",
    // };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/signin",
        data
      );
      // console.log(res.data);
      setSuccess(true);
      setMessage("Login Success");
      localStorage.setItem("user", JSON.stringify(res.data));
      setTimeout(() => {
        nav("/home");
      }, 500);
    } catch (error) {
      setMessage(error?.response?.data?.message);
      setSuccess(false);
      console.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;
    if (token) {
      nav("/home");
    }
  }, []);
  return (
    <div className="container">
      <div className="inp">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Required...";
            }
            if (!values.username) {
              errors.username = "Required...";
            }
            return errors;
          }}
          onSubmit={(values) => {
            userLogin(values);
          }}
        >
          {({ handleSubmit, errors, values, touched, handleChange }) => (
            <form className="form" onSubmit={handleSubmit}>
              <h3>Login Page</h3>
              <div>
                {msg && (
                  <p
                    style={{
                      color: isSuccess ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {msg}
                  </p>
                )}
              </div>
              {loginFields.map((i) => (
                <InputComponent
                  key={i.label}
                  {...i}
                  change={handleChange}
                  errors={errors}
                  values={values}
                  touched={touched}
                />
              ))}
              <div>
                <button className="btn" type="submit">
                  Login
                </button>
              </div>
            </form>
          )}
        </Formik>
        <span>Don&apos;t have an account?</span>{" "}
        <Link to={"/signup"} replace={true}>
          Click Here
        </Link>
      </div>
    </div>
  );
}

export default Login;
