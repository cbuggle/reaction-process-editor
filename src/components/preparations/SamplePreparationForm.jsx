import React, { useState } from "react";
import { Label, Input, Form, FormGroup } from "reactstrap";
import Select from "react-select";

import FormButtons from "../utilities/FormButtons";
import SampleSelection from "../utilities/SampleSelection";

const PreparationForm = ({
  preparation,
  preparationOptions,
  onSave,
  onCancel,
}) => {
  const [preparationForm, updatePreparationForm] = useState(
    preparation || { details: "" }
  );

  const sampleOptions = preparation
    ? preparationOptions.prepared_samples
    : preparationOptions.unprepared_samples;
  const samplePreparationOptions = preparationOptions.preparation_types;

  const handleSelectSample = (selectedSample) => {
    onInputChange({ name: "sample_id", value: selectedSample.sampleId });
  };

  const onInputChange = (field) => {
    const { name, value } = field;
    updatePreparationForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    if (!!preparationForm.sample_id) {
      onSave(preparationForm);
    }
  };

  return (
    <Form>
      <FormGroup>
        <SampleSelection
          sampleOptions={sampleOptions}
          sample={
            preparationForm.sample_id
              ? sampleOptions.find(
                  (option) => option.value === preparationForm.sample_id
                )
              : undefined
          }
          onChange={handleSelectSample}
        />
      </FormGroup>
      <FormGroup>
        <Label>Preparations</Label>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          isMulti
          isClearable={false}
          name="preparations"
          options={samplePreparationOptions}
          value={samplePreparationOptions.filter((option) =>
            (preparationForm.preparations || []).includes(option.value)
          )}
          onChange={(selectedOptions) =>
            onInputChange({
              name: "preparations",
              value: selectedOptions.map((option) => option.value),
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label>Equipment</Label>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          isMulti
          isClearable={false}
          name="equipment"
          options={preparationOptions.equipment}
          value={preparationOptions.equipment.filter((option) =>
            (preparationForm.equipment || []).includes(option.value)
          )}
          onChange={(selectedOptions) =>
            onInputChange({
              name: "equipment",
              value: selectedOptions.map((option) => option.value),
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label>Details</Label>
        <Input
          value={preparationForm.details}
          placeholder="Details"
          onChange={(event) =>
            onInputChange({ name: "details", value: event.target.value })
          }
        />
      </FormGroup>
      <FormButtons onSave={handleSave} onCancel={onCancel} type="preparation" />
    </Form>
  );
};

export default PreparationForm;
