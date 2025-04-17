import React from "react";
import { Button, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AutomationStatusDecorator from "../../decorators/AutomationStatusDecorator";

const AutomationStatusButton = ({ onChange, status, modelId }) => {

  const handleChangeAutomationStatus = () => {
    onChange(
      AutomationStatusDecorator.nextAutomationStatus(status)
    )
  }

  return (
    <>
      <div id={"automation_status_" + modelId}>
        <Button
          onClick={handleChangeAutomationStatus}
          color={AutomationStatusDecorator.colorForStatus(status)}
        >
          <FontAwesomeIcon icon={AutomationStatusDecorator.iconForStatus(status)} swapOpacity />
        </Button>
      </div>
      <UncontrolledTooltip target={"automation_status_" + modelId} >
        {AutomationStatusDecorator.labelForStatus(status)}
      </UncontrolledTooltip>
    </>
  );
};

export default AutomationStatusButton;
