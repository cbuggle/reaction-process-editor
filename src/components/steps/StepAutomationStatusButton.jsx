import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Badge, Button } from "reactstrap";
import IconButton from "../utilities/IconButton";
import AutomationDecorator from "../../decorators/AutomationDecorator";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const StepAutomationStatusButton = ({ stepId, status }) => {
  const api = useReactionsFetcher();
  const [hover, setHover] = useState(false);

  const nextStatus = AutomationDecorator.nextAutomationStatus(status)

  const displayStatus = hover ? nextStatus : status

  const visible = status !== ""
  const toggleAutomationStatus = () => {
    api.updateProcessStep({ id: stepId, automation_status: nextStatus });
  }
  const toggleIcon = () => setHover(!hover);

  return (
    <>{visible &&
      <div onMouseEnter={toggleIcon} onMouseLeave={toggleIcon}>
        <Button
          onClick={toggleAutomationStatus}
          color={AutomationDecorator.colorForStatus(displayStatus)}
          size="sm"
          className="card-header-label-button"
        >

          <FontAwesomeIcon
            // className="me-2"
            icon={AutomationDecorator.iconForStatus(displayStatus)}
            title={AutomationDecorator.labelForStatus(displayStatus)}

          />
          {/* {AutomationDecorator.labelForStatus(displayStatus)} */}
        </Button>
      </div>
    }
    </>
  );
};

export default StepAutomationStatusButton;
