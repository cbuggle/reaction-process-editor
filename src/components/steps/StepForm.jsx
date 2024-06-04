import React, { useState } from "react";

import AutoComplete from "../utilities/AutoComplete";
import FormButtons from "../utilities/FormButtons";
import VesselFormSection from "../vessels/VesselFormSection";

const StepForm = ({ processStep, previousStep, nameSuggestionOptions, onSave, onCancel }) => {

  const [stepName, setStepName] = useState(processStep?.name || "");
  const [reactionProcessVessel, setReactionProcessVessel] = useState(
    processStep?.reaction_process_vessel || {}
  );

  const handleSave = () => {
    onSave(stepName, reactionProcessVessel);
  };

  return (
    <>
      <AutoComplete
        options={nameSuggestionOptions.map((option) => option.label)}
        value={stepName}
        onChange={setStepName}
        domId="step-name-input"
        label="Name"
      />
      <VesselFormSection
        onChange={setReactionProcessVessel}
        reactionProcessVessel={reactionProcessVessel}
        reactionProcessVesselSuggestion={previousStep?.reaction_process_vessel}
        typeColor="step"
        scope={"Step" + (stepName ? ' "' + stepName + '"' : "")}
      />
      <FormButtons
        onSave={handleSave}
        onCancel={onCancel}
        type="step"
      />
    </>
  );
};

export default StepForm;
