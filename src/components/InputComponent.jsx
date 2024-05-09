/* eslint-disable react/prop-types */
import "../App.css";

function InputComponent({ change, errors, values, touched, ...props }) {
  return (
    <>
      <label hidden htmlFor="">
        {props.name}
      </label>
      <input {...props} value={values.value} onChange={change} />
      {errors[props.name] && touched[props.name] && (
        <p className="error">{errors[props.name]}</p>
      )}
    </>
  );
}

export default InputComponent;
