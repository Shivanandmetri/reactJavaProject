import axios from "axios";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";

const SubjectManagement = () => {
  const addSubject = async (values) => {
    // const data = {
    //   subjectname: values.subjectname,
    //   medium: values.medium,
    //   classid: parseInt(values.classid),
    //   teacherid: parseInt(values.teacherid),
    // };
    // console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/subject/addsubject",
        values
      );
      toast.success(`${res.data.message}`, {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        subjectName: "",
        medium: "",
        teacherName: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.subjectName) {
          errors.subjectName = "Required...";
        }
        if (!values.medium) {
          errors.medium = "Required...";
        }
        if (!values.teacherName) {
          errors.teacherName = "Required...";
        }
        return errors;
      }}
      onSubmit={(values) => {
        addSubject(values);
        console.log(values);
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <div className="sub_container">
          <ToastContainer />
          <form className="subject" onSubmit={handleSubmit}>
            <h3
              style={{
                textAlign: "center",
                fontFamily: "cursive",
                color: "#8D08F5",
              }}
            >
              Subject Management
            </h3>
            <div className="sub">
              <input
                type="text"
                placeholder="Subject Name"
                value={values.subjectName}
                name="subjectName"
                onChange={handleChange}
              />
              {errors.subjectName && touched.subjectName && (
                <p className="error">{errors.subjectName}</p>
              )}
              <input
                type="text"
                placeholder="Medium"
                value={values.medium}
                name="medium"
                onChange={handleChange}
              />
              {errors.medium && touched.medium && (
                <p className="error">{errors.medium}</p>
              )}
              {/* <input
                type="text"
                placeholder="Class ID"
                value={values.classid}
                name="classid"
                onChange={handleChange}
              />
              {errors.classid && touched.classid && (
                <p className="error">{errors.classid}</p>
              )} */}
              <input
                type="text"
                placeholder="Teacher Name"
                value={values.teacherName}
                name="teacherName"
                onChange={handleChange}
              />
              {errors.teacherName && touched.teacherName && (
                <p className="error">{errors.teacherName}</p>
              )}
            </div>
            <div className="class_btns">
              <button type="submit" className="add">
                Add
              </button>
              {/* <button type="button" className="del">
                Delete
              </button>
              <button type="button" className="mod">
                Modify
              </button> */}
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default SubjectManagement;

{
  /* <div>
            <label htmlFor="subject">Select Subject: </label>
            <select name="subject" id="subject">
              <option value="">None</option>
              <option value="kannada">KANNADA</option>
              <option value="english">ENGLISH</option>
              <option value="hindi">HINDI</option>
              <option value="mathematics">MATHEMATICS</option>
              <option value="science">SCIENCE</option>
              <option value="social science">SOCIAL SCIENCE</option>
            </select>
          </div> */
}
