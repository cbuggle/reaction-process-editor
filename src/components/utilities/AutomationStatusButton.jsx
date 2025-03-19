import React, { useState } from "react";
import { Button, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AutomationStatusDecorator from "../../decorators/AutomationStatusDecorator";

const AutomationStatusButton = ({ onChange, status, disabled, modelId }) => {
  const [hover, setHover] = useState(false);

  const nextStatus = AutomationStatusDecorator.nextAutomationStatus(status)

  const displayStatus = hover && !disabled ? nextStatus : status

  const blocked = status === "" || status === undefined

  const toggleIcon = () => blocked || setHover(!hover);

  const handleChhangeAutomationStatus = () => {
    onChange(nextStatus)
  }

  return (
    <>
      <div id={"automation_status_" + modelId}>
        <div onMouseEnter={toggleIcon} onMouseLeave={toggleIcon} >
          <Button
            onClick={handleChhangeAutomationStatus}
            color={AutomationStatusDecorator.colorForStatus(displayStatus)}
            size="sm"
            disabled={disabled || blocked}
            inverse={!blocked.toString()}
          >
            <FontAwesomeIcon icon={AutomationStatusDecorator.iconForStatus(status)} swapOpacity />
          </Button>
        </div >
      </div>

      <UncontrolledTooltip target={"automation_status_" + modelId} >
        {AutomationStatusDecorator.labelForStatus(status)}
      </UncontrolledTooltip>

    </>
  );
};

export default AutomationStatusButton;
