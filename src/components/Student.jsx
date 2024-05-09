import "./Student.css";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Student() {
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required..."),
    lastname: Yup.string().required("Last Name is required..."),
    fathername: Yup.string().required("Father Name is  required..."),
    mothername: Yup.string().required("Mother name is required..."),
    dob: Yup.string().required("DOB is required..."),
    contact: Yup.string()
      .min(10, "Too Short!")
      .max(10, "Too Long!")
      .required("Contact is required..."),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required..."),
    religion: Yup.string().required("Religion is required..."),
    caste: Yup.string().required("Caste is required..."),
    adhaarNo: Yup.string()
      .min(12, "Too Short!")
      .max(12, "Too Long!")
      .required("Adhaar is required..."),
    address: Yup.string().required("Address is required..."),
    satsid: Yup.string().required("Required..."),
    school: Yup.string().required("Required..."),
    section: Yup.string().required("Required..."),
  });

  const addStudent = async (values) => {
    // const data = {
    //     firstname: values.firstname,
    //     lastname: values.lastname,
    //     fathername: values.fathername,
    //     mothername: values.mothername,
    //     email: values.email,
    //     dob: values.dob,
    //     contact: values.contact,
    //     gender: values.gender,
    //     religion: values.religion,
    //     caste: values.caste,
    //     adhaarNo: values.adhaarNo,
    //     address: values.address,
    //     satsid: values.satsid,
    //     school:values.school,
    //     section: values.section,
    // }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/student/addStudent",
        values
      );
      console.log(res.data);
      toast.success(`${res.data.message}`, {
        position: "top-center",
      });
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="App">
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            fathername: "",
            mothername: "",
            email: "",
            dob: "",
            contact: "",
            gender: "",
            religion: "",
            caste: "",
            adhaarNo: "",
            address: "",
            satsid: "",
            school: "",
            section: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            addStudent(values);
            console.log(values);
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            // resetForm,
          }) => (
            <div>
              <h1>Student Registration Form</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name</label>
                <input
                  className="std-inp"
                  type="text"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
                {errors.firstname && touched.firstname && (
                  <p className="err">{errors.firstname}</p>
                )}

                <label htmlFor="lastname">Last Name</label>
                <input
                  className="std-inp"
                  type="text"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                />
                {errors.lastname && touched.lastname && (
                  <p className="err">{errors.lastname}</p>
                )}

                <label htmlFor="fathername">Father Name</label>
                <input
                  className="std-inp"
                  type="text"
                  name="fathername"
                  value={values.fathername}
                  onChange={handleChange}
                  placeholder="Enter Father Name"
                />
                {errors.fathername && touched.fathername && (
                  <p className="err">{errors.fathername}</p>
                )}

                <label htmlFor="mothername">Mother Name</label>
                <input
                  className="std-inp"
                  type="text"
                  name="mothername"
                  value={values.mothername}
                  onChange={handleChange}
                  placeholder="Enter Mother Name"
                />
                {errors.mothername && touched.mothername && (
                  <p className="err">{errors.mothername}</p>
                )}

                <label htmlFor="email">Enter Email</label>
                <input
                  className="std-inp"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
                {errors.email && touched.email && (
                  <p className="err">{errors.email}</p>
                )}

                <label htmlFor="dob">Date of Birth</label>
                <input
                  className="std-inp"
                  type="date"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  placeholder="DOB"
                />
                {errors.dob && touched.email && (
                  <p className="err">{errors.dob}</p>
                )}
                <label htmlFor="contact">Contact</label>
                <input
                  className="std-inp"
                  type="number"
                  name="contact"
                  value={values.contact}
                  onChange={handleChange}
                  placeholder="Enter Mobile number"
                />
                {errors.contact && touched.contact && (
                  <p className="err">{errors.contact}</p>
                )}
                <label htmlFor="religion">Religion</label>
                <input
                  className="std-inp"
                  type="text"
                  name="religion"
                  value={values.religion}
                  onChange={handleChange}
                  placeholder="Enter religion"
                />
                {errors.religion && touched.religion && (
                  <p className="err">{errors.religion}</p>
                )}

                <label htmlFor="caste">Enter Caste</label>
                <input
                  className="std-inp"
                  type="text"
                  name="caste"
                  value={values.caste}
                  onChange={handleChange}
                  placeholder="Enter caste"
                />
                {errors.caste && touched.caste && (
                  <p className="err">{errors.caste}</p>
                )}

                <label id="gender" htmlFor="gender">
                  Gender
                </label>
                <div className="gender">
                  {genderOptions.map((option, index) => (
                    <>
                      <Field
                        key={option.value}
                        type="radio"
                        name="gender"
                        value={option.value}
                      />
                      <label id="gender" htmlFor="gender" key={index}>
                        {option.label}
                      </label>
                    </>
                  ))}
                </div>
                {errors.gender && touched.gender && (
                  <p className="err">{errors.gender}</p>
                )}

                <label htmlFor="adhaarNo">Aadhaar Number</label>
                <input
                  className="std-inp"
                  type="number"
                  name="adhaarNo"
                  value={values.adhaarNo}
                  onChange={handleChange}
                  placeholder="Enter Aadhaar number"
                />
                {errors.adhaarNo && touched.adhaarNo && (
                  <p className="err">{errors.adhaarNo}</p>
                )}

                <label htmlFor="satsid">SatsId</label>
                <input
                  className="std-inp"
                  type="text"
                  name="satsid"
                  value={values.satsid}
                  onChange={handleChange}
                  placeholder="Enter satsid"
                />
                {errors.satsid && touched.satsid && (
                  <p className="err">{errors.satsid}</p>
                )}

                <label htmlFor="school">Enter School</label>
                <input
                  className="std-inp"
                  type="text"
                  name="school"
                  value={values.school}
                  onChange={handleChange}
                  placeholder="Enter School"
                />
                {errors.school && touched.school && (
                  <p className="err">{errors.school}</p>
                )}

                <label htmlFor="section">Enter Section</label>
                <input
                  className="std-inp"
                  type="text"
                  name="section"
                  value={values.section}
                  onChange={handleChange}
                  placeholder="Enter section"
                />
                {errors.section && touched.section && (
                  <p className="err">{errors.section}</p>
                )}
                <label htmlFor="address">Address</label>
                <textarea
                  name="address"
                  id="address"
                  cols="30"
                  rows="10"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Your Address"
                />
                {errors.address && touched.address && (
                  <p className="err">{errors.address}</p>
                )}

                <div className="btn_box">
                  {/* <button onClick={resetForm} type="reset" value="reset">
                    Reset
                  </button> */}
                  <button type="submit">Save</button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Student;
