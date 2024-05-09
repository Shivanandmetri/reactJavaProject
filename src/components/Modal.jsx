import { Formik } from "formik";
import "./Modal.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Modal = ({ showModal, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  const addSubject = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/subject/addsubject",
        values
      );
      toast.success(`${res.data.message}`, {
        position: "top-center",
      });
     setShowModal(false)
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
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
      {({ handleChange, handleSubmit, values }) => (
        <div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Add Subject</h3>
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <form onSubmit={handleSubmit}>
                  <div className="input-container">
                    <input
                      type="text"
                      name="subjectName"
                      placeholder="Enter Subject Name"
                      value={values.subjectName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="medium"
                      placeholder="Enter Medium"
                      value={values.medium}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="teacherName"
                      placeholder="Enter Teacher Name"
                      value={values.teacherName}
                      onChange={handleChange}
                    />
                    <button type="submit">Save</button>
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default Modal;
