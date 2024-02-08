import React, { useState, useContext } from "react";

import FormButtons from "../utilities/FormButtons";
import VesselFormSection from "../vessels/VesselFormSection";
import { VesselOptions } from "../../contexts/VesselOptions";
import VesselDecorator from "../../decorators/VesselDecorator";
import SingleLineFormGroup from "../utilities/SingleLineFormGroup";
import { Typeahead } from "react-bootstrap-typeahead";

const StepForm = ({ processStep, nameSuggestionOptions, onSave, onCancel }) => {
  const vessels = useContext(VesselOptions);

  const assignVessel = (vesselId) => {
    setCurrentVessel(VesselDecorator.getVesselById(vesselId, vessels));
  };

  const [tempName, setTempName] = useState("");
  const [stepName, setStepName] = useState(processStep?.name || "");
  const [currentVessel, setCurrentVessel] = useState(processStep?.vessel);

  const handleChange = (name) => {
    console.log("change", JSON.stringify(name), typeof name);
    handleNameInput(name);
  };

  const handleInputChange = (name) => {
    console.log("inputChange", JSON.stringify(name), typeof name);
    setTempName(name);
  };

  const handleBlur = () => {
    console.log("blur", JSON.stringify(tempName), typeof tempName);
    if (tempName) {
      handleNameInput(tempName);
    } else {
      handleNameInput(stepName ? stepName : "");
    }
  };

  const handleNameInput = (name) => {
    if (typeof name === "string") {
      setStepName(name);
    } else if (name.length > 0) {
      if (typeof name[0] === "string") {
        setStepName(name[0]);
      } else {
        setStepName(name[0].label);
      }
    } else {
      console.log("handleNameInput", JSON.stringify(name), typeof name);
    }
  };

  const handleSave = () => {
    onSave(stepName, currentVessel.id);
  };

  return (
    <>
      <div className="form-section form-section--step mb-3">
        <SingleLineFormGroup label="Name">
          {/*<p>
            stepName: {JSON.stringify(stepName)} {typeof stepName}
          </p>
          <p>
            tempName: {JSON.stringify(tempName)} {typeof tempName}
          </p>*/}
          <Typeahead
            allowNew
            id="step-name"
            onBlur={(e) => handleBlur()}
            onChange={(selected) => handleChange(selected)}
            onInputChange={(text) => handleInputChange(text)}
            options={nameSuggestionOptions.map((option) => option.label)}
            defaultSelected={[stepName]}
          />
        </SingleLineFormGroup>
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
