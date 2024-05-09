/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./dropdown.css";
const SearchableDropdown = ({
  options,
  label,
  id,
  name,
  selectedVal,
  handleChange,
  handleQueryChange,
  setFieldValue,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    setFieldValue(name, option[label]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  // const filter = (options) => {
  //   return options.filter(
  //     // (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
  //     // (option) => option[label].toLowerCase().includes(query.toLowerCase())
  //     (option) => option[label].toLowerCase().startsWith(query.toLowerCase())
  //   );
  // };

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            ref={inputRef}
            autoComplete="off"
            type="text"
            value={getDisplayValue()}
            name="name"
            placeholder="Enter Section Name..."
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(e);
              handleQueryChange(e.target.value);
            }}
            onClick={toggle}
          />
        </div>
        {/* <div className={`arrow ${isOpen ? "open" : ""}`}></div> */}
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {/* filter(options) */}
        {options.length > 0 &&
          options?.map((option, index) => {
            return (
              <div
                onClick={() => selectOption(option)}
                className={`option ${
                  option[label] === selectedVal ? "selected" : ""
                }`}
                key={`${id}-${index}`}
              >
                {option[label]}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchableDropdown;
