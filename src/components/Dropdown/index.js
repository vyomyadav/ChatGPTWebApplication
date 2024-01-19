import React, {useState} from "react";
import Select from "react-select";

const CustomDropdown = (props) => {
  const { clientList, updateSelectedClient } = props
  const [selectedOption, setSelectedOption] = useState(null);

  const options = clientList.map(option => ({ value: option, label: option }));

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
        placeholder="Sélectionnez un client..."
      />
    </div>
  );
};

export default CustomDropdown;
