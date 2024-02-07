import React, { useState, useContext } from "react";
import { Input } from "reactstrap";

import FormButtons from "../utilities/FormButtons";
import VesselFormSection from "../vessels/VesselFormSection";
import { VesselOptions } from "../../contexts/VesselOptions";
import VesselDecorator from "../../decorators/VesselDecorator";
import { Label } from "reactstrap";

const StepForm = ({ processStep, nameSuggestionOptions, onSave, onCancel }) => {
  const vessels = useContext(VesselOptions);

  const assignVessel = (vesselId) => {
    setCurrentVessel(vessels.find((vessel) => vessel.id === vesselId));
  };

  const [stepName, setStepName] = useState(processStep?.name);
  const [currentVessel, setCurrentVessel] = useState(processStep?.vessel);

  const handleSave = () => {
    onSave(stepName, currentVessel.id);
  };

  const renderNameSuggestionSelect = () => {
    if (nameSuggestionOptions) {
      return (
        <select
          selected="current"
          type="select"
          onChange={(event) =>
            setStepName(
              nameSuggestionOptions[event.target.selectedIndex - 1].label
            )
          }
        >
          <option key="current" hidden="hidden">
            {stepName}
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
          value={stepName}
          onChange={(event) => setStepName(event.target.value)}
        />
        {renderNameSuggestionSelect()}
      </div>
      <VesselFormSection
        currentVessel={currentVessel}
        onSelectVessel={assignVessel}
        typeColor="step"
        buttonLabel={!!currentVessel ? "Change" : "Set"}
        scope={"Step" + (stepName ? ' "' + stepName + '"' : "")}
      />
      <FormButtons
        onSave={handleSave}
        onCancel={onCancel}
        type="step"
        disableSave={!currentVessel || !stepName}
      />
    </>
  );
};

export default StepForm;
