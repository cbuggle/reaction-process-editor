import React, { useState, useContext } from "react";

import AutoComplete from "../utilities/AutoComplete";
import FormButtons from "../utilities/FormButtons";
import VesselFormSection from "../vessels/VesselFormSection";
import VesselDecorator from "../../decorators/VesselDecorator";

import { VesselOptions } from "../../contexts/VesselOptions";

const StepForm = ({ processStep, nameSuggestionOptions, onSave, onCancel }) => {
  const vessels = useContext(VesselOptions);

  const [stepName, setStepName] = useState(processStep?.name || "");
  const [currentVessel, setCurrentVessel] = useState(processStep?.vessel);
  const [reactionProcessVessel, setReactionProcessVessel] = useState(
    processStep?.reaction_process_vessel || {}
  );

  const assignVessel = (vesselId) => {
    setCurrentVessel(VesselDecorator.getVesselById(vesselId, vessels));
  };

  const handleSelectVesselPreparations = (preparations) => {
    setReactionProcessVessel({
      ...reactionProcessVessel,
      preparations: preparations,
    });
  };

  const handleSave = () => {
    onSave(stepName, currentVessel.id, reactionProcessVessel);
  };

  return (
    <>
      <AutoComplete
        options={nameSuggestionOptions.map((option) => option.label)}
        value={stepName}
        onChange={setStepName}
        domId="step-name-input"
        label="Name"
      />{" "}
      <VesselFormSection
        currentVessel={currentVessel}
        onSelectVessel={assignVessel}
        reactionProcessVessel={reactionProcessVessel}
        onSelectPreparations={handleSelectVesselPreparations}
        typeColor="step"
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
