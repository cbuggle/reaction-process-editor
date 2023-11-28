import React, { useState } from "react"
import { useReactionsFetcher } from "../../../fetchers/ReactionsFetcher";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../utilities/IconButton";

const StepLockButton = (
  {
    stepId,
    locked
  }) => {
  const api = useReactionsFetcher()
  const [hover, setHover] = useState(false);
  const chooseIcon = (isHover) => {
    return (isHover === locked) ? 'lock-open' : 'lock'
  }
  const [icon, setIcon] = useState(chooseIcon(false));


  const toggleLocked = () => {
    api.toggleProcessStepLock(stepId)
  }

  function toggleIcon() {
    setHover(!hover);
    setIcon(chooseIcon(!hover))
  }

  return (
    <div
        onMouseEnter={toggleIcon}
        onMouseLeave={toggleIcon}
    >
      {locked ?
        <Button
          onClick={toggleLocked}
          color='white'
          size='sm'
          className='step-lock-button--closed'
        >
          locked
          <FontAwesomeIcon
            icon={icon}
            className="ms-1"
          />
        </Button >
        :
        <IconButton
          onClick={toggleLocked}
          icon={icon}
        />
      }
    </div>
  )
};

export default StepLockButton;
