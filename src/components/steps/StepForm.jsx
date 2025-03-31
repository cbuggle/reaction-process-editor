import React, { useState } from "react";

import AutoComplete from "../activities/forms/formgroups/AutoComplete";
import FormButtons from "../utilities/FormButtons";
import VesselableFormSection from "../vesselables/VesselableFormSection";
import AutomationStatusFormGroup from "../activities/forms/formgroups/AutomationStatusFormGroup";

const StepForm = ({ processStep, previousStep, nameSuggestionOptions, onSave, onCancel }) => {

  const previousStepIsHalted = ["HALT_BY_PRECEDING", "MANUAL_PROCEED"].includes(previousStep?.automation_status)
  const previousStepHasHalt = previousStep?.activities?.find(activity => ['HALT', 'AUTOMATION_RESPONDED'].includes(activity.workup['AUTOMATION_STATUS']))

  const haltStatusFromPreviousStep = previousStepIsHalted || previousStepHasHalt ? "HALT_BY_PRECEDING" : ""

  const [stepName, setStepName] = useState(processStep?.name || "");
  const [automationStatus, setAutomationStatus] = useState(processStep?.automation_status || haltStatusFromPreviousStep);
  const [reactionProcessVessel, setReactionProcessVessel] = useState(processStep?.reaction_process_vessel || {});

  const handleSave = () => {
    onSave(stepName, reactionProcessVessel, automationStatus);
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
      <VesselableFormSection
        onChange={setReactionProcessVessel}
        reactionProcessVessel={reactionProcessVessel}
        reactionProcessVesselSuggestion={previousStep?.reaction_process_vessel}
        typeColor="step"
        scope={"Step" + (stepName ? ' "' + stepName + '"' : "")}
      />
      <AutomationStatusFormGroup
        modelId={processStep?.id}
        status={automationStatus}
        onChange={setAutomationStatus}
        onResolvePooling={onSave}
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
