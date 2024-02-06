import React, { useState, useContext } from "react";
import { Input } from "reactstrap";

import FormButtons from "../utilities/FormButtons";
import VesselModalButton from "../vessels/VesselModalButton";
import { VesselOptions } from "../../contexts/VesselOptions";
import VesselDecorator from "../../decorators/VesselDecorator";
import { Label } from "reactstrap";

const StepForm = ({ processStep, nameSuggestionOptions, onSave, onCancel }) => {
  const vessels = useContext(VesselOptions);

  const assignVessel = (vesselId) => {
    setVessel(vessels.find((vessel) => vessel.id === vesselId));
  };

  const [stepForm, setStepForm] = useState(processStep || { name: "" });
  const [vessel, setVessel] = useState(processStep?.vessel);

  const onChangeName = (field) => {
    const { name, value } = field;
    setStepForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(stepForm, vessel.id);
  };

  const handleSelectName = (value) => {
    onChangeName({ name: "name", value: value });
  };

  const renderNameSuggestionSelect = () => {
    if (nameSuggestionOptions) {
      return (
        <select
          selected="current"
          type="select"
          onChange={(event) =>
            handleSelectName(
              nameSuggestionOptions[event.target.selectedIndex - 1].label
            )
          }
        >
          <option key="current" hidden="hidden">
            {stepForm.name}
          </option>
          {nameSuggestionOptions.map((suggestion) => (
            <option key={suggestion.value}>{suggestion.label}</option>
          ))}
        </select>
      );
    } else {
      return;
    }
  };

  return (
    <>
      <div className="form-section form-section--step mb-3">
        <Input
          bsSize="sm"
          placeholder="Unnamed"
          value={stepForm.name}
          onChange={(event) =>
            onChangeName({ name: "name", value: event.target.value })
          }
        />
        {renderNameSuggestionSelect()}
      </div>
      <div className="form-section form-section--step mb-3">
        <div className="d-flex justify-content-between align-self-center">
          <Label
            className={
              "col-form-label" +
              (!!processStep?.vessel ? "" : " label--disabled")
            }
          >
            {VesselDecorator.vesselSingleLine(vessel) || "No vessel assigned"}
          </Label>
          <div className="optional-form-group__open-controls">
            <div className="d-grid gap-2">
              <VesselModalButton
                onSelectVessel={assignVessel}
                typeColor="step"
                buttonLabel={!!processStep?.vessel ? "Change" : "Assign"}
              />
            </div>
          </div>
        </div>
      </div>
      <FormButtons
        onSave={handleSave}
        onCancel={onCancel}
        type="step"
        disableSave={!vessel || !stepForm.name}
      />
    </>
  );
};

export default StepForm;
