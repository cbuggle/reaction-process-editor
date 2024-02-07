import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "reactstrap";
import IconButton from "../utilities/IconButton";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const StepLockButton = ({ stepId, locked }) => {
  const api = useReactionsFetcher();
  const [hover, setHover] = useState(false);

  const icon = locked === hover ? "lock-open" : "lock";

  const label = hover ? "unlock" : "locked";

  const toggleLocked = () =>
    api.updateProcessStep({ id: stepId, locked: !locked });

  const toggleIcon = () => setHover(!hover);

  return (
    <div onMouseEnter={toggleIcon} onMouseLeave={toggleIcon}>
      {locked ? (
        <Button
          onClick={toggleLocked}
          color="white"
          size="sm"
          className="step-lock-button--closed"
        >
          {label}
          <FontAwesomeIcon icon={icon} className="ms-1" />
        </Button>
      ) : (
        <IconButton onClick={toggleLocked} icon={icon} />
      )}
    </div>
  );
};

export default StepLockButton;
