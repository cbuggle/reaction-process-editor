import React, { useState, useContext } from "react";

import VesselFormSection from "../vessels/VesselFormSection";
import VesselPreparationsFormSection from "../vessels/VesselPreparationsFormSection"

import AutoComplete from "../utilities/AutoComplete";
import FormButtons from "../utilities/FormButtons";
import VesselDecorator from "../../decorators/VesselDecorator";

import { VesselOptions } from "../../contexts/VesselOptions";

const StepForm = ({ processStep, nameSuggestionOptions, onSave, onCancel }) => {
  const vessels = useContext(VesselOptions);

  const assignVessel = (vesselId) => {
    setCurrentVessel(VesselDecorator.getVesselById(vesselId, vessels));
  };

  const [stepName, setStepName] = useState(processStep?.name || "");
  const [currentVessel, setCurrentVessel] = useState(processStep?.vessel);
  const [reactionProcessVessel, setReactionProcessVessel] = useState(processStep?.reaction_process_vessel || {});

  const handleSave = () => {
    onSave(stepName, currentVessel.id, reactionProcessVessel);
  };

  return (
    <>
      <div className="form-section form-section--step mb-3">
        <AutoComplete
          options={nameSuggestionOptions.map((option) => option.label)}
          value={stepName}
          onChange={setStepName}
          domId="step-name-input"
          label="Name"
        />
      </div>
      <VesselFormSection
        currentVessel={currentVessel}
        onSelectVessel={assignVessel}
        typeColor="step"
        buttonLabel={!!currentVessel ? "Change" : "Set"}
        scope={"Step" + (stepName ? ' "' + stepName + '"' : "")}
      />
      <VesselPreparationsFormSection
        reactionProcessVessel={reactionProcessVessel}
        onChange={setReactionProcessVessel}
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
