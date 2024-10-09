import React, { useState, useEffect } from "react";
import SingleLineFormGroup from "./SingleLineFormGroup";
import { Typeahead } from "react-bootstrap-typeahead";

const AutoComplete = ({ label, options, value, onChange, domId }) => {
  const [tempValue, setTempValue] = useState("");
  const [currentValue, setCurrentValue] = useState(value || "");

  const handleChange = (selectionArray) => {
    if (selectionArray.length > 0) {
      if (typeof selectionArray[0] === "string") {
        onChange(selectionArray[0]);
      } else {
        onChange(selectionArray[0].label);
      }
    }
  };

  const handleInputChange = (text) => {
    setTempValue(text);
  };

  const handleBlur = () => {
    if (tempValue) {
      onChange(tempValue);
    } else {
      onChange(currentValue ? currentValue : "");
    }
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <SingleLineFormGroup label={label}>
      <Typeahead
        allowNew
        id={domId}
        onBlur={(e) => handleBlur()}
        onChange={(selected) => handleChange(selected)}
        onInputChange={(text) => handleInputChange(text)}
        options={options}
        defaultSelected={[currentValue]}
        newSelectionPrefix={"New " + label + ": "}
      />
    </SingleLineFormGroup>
  );
};

export default AutoComplete;
