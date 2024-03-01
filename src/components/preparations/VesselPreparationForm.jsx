import React, { useContext, useState } from "react";
import { Label, Form, FormGroup } from "reactstrap";
import Select from "react-select";

import FormButtons from "../utilities/FormButtons";
import { SelectOptions } from "../../contexts/SelectOptions";
import OptionsDecorator from "../../decorators/OptionsDecorator";

const VesselPreparationForm = ({ formData, onSave, onCancel }) => {
  const selectOptions = useContext(SelectOptions);
  const preparationOptions =
    selectOptions.vessel_preparations.preparation_types;
  const [vesselPreparations, setVesselPreparations] = useState(formData);

  const onInputChange = (field) => {
    const { name, value } = field;
    setVesselPreparations((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(vesselPreparations);
  };

  const handleCancel = () => {
    setVesselPreparations(formData);
    onCancel();
  };

  return (
    <Form>
      <FormGroup>
        <Label>Preparations</Label>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_id"
          isDisabled={false}
          isMulti
          isClearable={false}
          options={preparationOptions}
          value={OptionsDecorator.optionsForKeys(vesselPreparations.preparations, preparationOptions)}
          onChange={(selected) =>
            onInputChange({
              name: "preparations",
              value: selected.map((option) => option.value),
            })
          }
        />
        <FormButtons
          onSave={handleSave}
          onCancel={handleCancel}
          type="preparation"
        />
      </FormGroup>
    </Form>
  );
};

export default VesselPreparationForm;
