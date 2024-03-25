import React, {useState, useEffect} from "react";
import Select from "react-select";

const CustomDropdown = (props) => {
  const { clientList, updateSelectedClient, placeholder } = props
  const [selectedOption, setSelectedOption] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let options;
  if(clientList[0]?.id) {
    options = clientList.map(option => ({ value: option.id, label: option.nom }));
  } else {
    options = clientList.map(option => ({ value: option, label: option }));
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: "black", // Change the border color as needed
      height: windowWidth > 2000 ? "60px" : "40px",
      color: "black" // Change the height as needed
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "grey", // Change the placeholder color
      fontSize: windowWidth > 2000 ? "1.4rem" : "14px", // Change the font size
      textAlign: "center"
    }),
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    updateSelectedClient(selectedOption);
  };

  return (
    <div id="dropdown-client">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable={true}
        placeholder={placeholder}
        styles={customStyles}
      />
    </div>
  );
};

export default CustomDropdown;
