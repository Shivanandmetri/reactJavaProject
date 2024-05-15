import "./classes.css";
import { Formik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import SearchableDropdown from "./SearchableDropdown";
import SectionSubjects from "./SectionSubjects";

const classDetails = [
  {
    type: "text",
    placeholder: "Teacher Name",
    name: "teacherName",
  },
  {
    type: "text",
    placeholder: "Academic Year",
    name: "academicYear",
  },
];

const ClassComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [query, setQuery] = useState("");

  const handleFieldChange = (fieldName, event, form) => {
    const { value } = event.target;
    form.setFieldValue(fieldName, value);
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const addClass = async (values) => {
    const data = {
      name: values.name,
      teacherName: values.teacherName,
      academicYear: parseInt(values.academicYear),
    };
    console.log("Data", data);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/section/addSection",
        data
      );
      toast.success(`${res.data.message}`, {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const getClasses = async () => {
    // const res = await axios.get("http://localhost:8080/api/section/sections");
    const res = await axios.get(
      `http://localhost:8080/api/section/search?searchText=${query}`
    );
    setSections(res.data);
  };
  // console.log(sections);

  const getSubjects = async (values) => {
    const item = sections?.find(
      (x) => x.name.toLowerCase() === values.name.toLowerCase()
    );
    console.log(item);
    if (item) {
      const res = await axios.get(
        `http://localhost:8080/api/section/getAll/${item?.id}`
      );
      setSubjects(res.data);
    }
  };
  // console.log(subjects);

  useEffect(() => {
    // if (query !== "") {
    //   getClasses();
    // }
    getClasses();
 
  }, [query]);

  return (
    <div className="sectionContainer">
      <div className="classContainer">
        <ToastContainer />
        <h3
          style={{
            textAlign: "center",
            fontFamily: "cursive",
            color: "#8D08F5",
          }}
        >
          Section Management
        </h3>
        <Formik
          initialValues={{
            name: "",
            teacherName: "",
            academicYear: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required...";
            }
            if (!values.teacherName) {
              errors.teacherName = "Required...";
            }
            if (!values.academicYear) {
              errors.academicYear = "Required...";
            }
            return errors;
          }}
          onSubmit={(values) => {
            // addClass(values);
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            touched,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <SearchableDropdown
                options={sections}
                label="name"
                name="name"
                id="id"
                touched={touched}
                errors={errors}
                selectedVal={values.name}
                handleQueryChange={handleQueryChange}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
              {classDetails.map((i, index) => (
                <div key={index} className="detail">
                  <label htmlFor="" hidden>
                    {i.name}
                  </label>
                  <input
                    type={i.type}
                    name={i.name}
                    onChange={(event) =>
                      handleFieldChange(i.name, event, { setFieldValue })
                    }
                    value={values[i.name]} // changed
                    placeholder={i.placeholder}
                  />
                  {errors[i.name] && touched[i.name] && (
                    <p className="error">{errors[i.name]}</p>
                  )}
                </div>
              ))}
              <div className="btnbox">
                <button type="submit">Save</button>
                <div className="class_btns">
                  <a onClick={() => setShowModal(true)}>Add Subject</a>
                  <a onClick={() => getSubjects(values)}>ShowSubjects</a>
                </div>
              </div>
              {subjects.length > 0 && (
                <SectionSubjects subjs={subjects} section={values.name} />
              )}
            </form>
          )}
        </Formik>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default ClassComponent;


