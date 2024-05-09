import { Link } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import "../App.css";

const signUpFields = [
  {
    type: "text",
    placeholder: "Username",
    name: "name",
  },
  {
    type: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
  },
  {
    type: "password",
    placeholder: "ConfirmPassword",
    name: "confirmpassword",
  },
  {
    type: "text",
    placeholder: "Role",
    name: "role",
  },
];

const SignUp = () => {
  const [msg, setMessage] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const register = async (values) => {
    const userData = {
      username: values.name,
      email: values.email,
      role: [values.role],
      password: values.password,
    };
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    try {
      // const { confirmpassword, ...rest } = values;
      const res = await axios.post(
        "http://localhost:8080/api/auth/signup",
        userData,
        { headers }
      );
      console.log("response from backend ---- ", res?.data?.message);
      setSuccess(true);
      setMessage(res?.data?.message);
    } catch (error) {
      setMessage(error?.response?.data.message);
      setSuccess(false);
      console.error("err", error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="inp">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
            role: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required...";
            }
            if (!values.password) {
              errors.password = "Required...";
            } else if (
              values.password.length < 6 ||
              values.password.length > 40
            ) {
              errors.password = "password length should be between 6 and 40";
            }
            if (!values.confirmpassword) {
              errors.confirmpassword = "Required...";
            } else if (values.password !== values.confirmpassword) {
              errors.confirmpassword =
                "confirm Password should match with password";
            } else if (
              values.confirmpassword.length < 6 ||
              values.confirmpassword.length > 40
            ) {
              errors.confirmpassword =
                "password length should be between 6 and 40";
            }
            if (!values.email) {
              errors.email = "Required...";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values) => {
            register(values);
          }}
        >
          {({ handleSubmit, values, handleChange, errors, touched }) => (
            <form className="form" onSubmit={handleSubmit}>
              <h3>Signup Page</h3>
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
              {signUpFields.map((i, index) => (
                <>
                  <label hidden htmlFor="">
                    {i.name}
                  </label>
                  <input
                    autoComplete
                    type={i.type}
                    name={i.name}
                    placeholder={i.placeholder}
                    value={values[index]}
                    onChange={handleChange}
                  />
                  {errors[i.name] && touched[i.name] && (
                    <p className="error">{errors[i.name]}</p>
                  )}
                </>
              ))}
              <div>
                <button className="btn" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </Formik>
        <span>Already have an account?</span>{" "}
        <Link to={"/"} replace={true}>
          Click Here
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
