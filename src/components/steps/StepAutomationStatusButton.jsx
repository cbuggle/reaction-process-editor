import React from "react";
import AutomationStatusButton from "../utilities/AutomationStatusButton";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const StepAutomationStatusButton = ({ stepId, status, disabled }) => {
  const api = useReactionsFetcher();

  const toggleAutomationStatus = (newStatus) => {
    api.updateProcessStep({ id: stepId, automation_status: newStatus });
  }

  return (
    <AutomationStatusButton
      onChange={toggleAutomationStatus}
      status={status}
      disabled={disabled}
      modelId={stepId} />
  );
};

export default StepAutomationStatusButton;
