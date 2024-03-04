import React, { useContext, useState } from "react";
import Select from "react-select"
import { Label } from "reactstrap";

import VesselDecorator from "../../decorators/VesselDecorator";
import { SelectOptions } from "../../contexts/SelectOptions";

const VesselPreparationsFormSection = ({
  reactionProcessVessel,
  onChange,
  typeColor,

}) => {
  const selectOptions = useContext(SelectOptions);
  const preparationOptions = selectOptions.vessel_preparations.preparation_types;

  const onInputChange = (field) => {
    const { name, value } = field;
    onChange(() => ({
      ...reactionProcessVessel,
      [name]: value,
    }));
  };


  return (
    <div className={"form-section form-section--" + typeColor}>
      <div className="d-flex justify-content-between align-self-center">

        <Label>Preparations:</Label>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_id"
          isDisabled={false}
          isMulti
          isClearable={false}
          options={preparationOptions}
          value={preparationOptions.filter((option) =>
            reactionProcessVessel.preparations?.includes(option.value)
          )}
          onChange={(selected) =>
            onInputChange({
              name: "preparations",
              value: selected.map((option) => option.value),
            })
          }
        />
      </div>
    </div>
  );
};


export default VesselPreparationsFormSection;
