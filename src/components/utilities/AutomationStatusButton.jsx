import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "reactstrap";
import AutomationDecorator from "../../decorators/AutomationDecorator";

const AutomationStatusButton = ({ onChange, status, ...props }) => {

  const toggleAutomationStatus = () => {
    onChange(AutomationDecorator.nextAutomationStatus(status))
  }

  return (
    <Button
      size="sm"
      onClick={toggleAutomationStatus}
      color={AutomationDecorator.colorForStatus(status)}
      {...props}
    >
      <FontAwesomeIcon
        icon={AutomationDecorator.iconForStatus(status)}
        title={AutomationDecorator.labelForStatus(status)} />
    </Button >
  )
};

export default AutomationStatusButton;
