import React from 'react';
import { UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const TooltipButton = ({ tooltip, tooltipId }) => {
  return (
    <>
      <FontAwesomeIcon
        id={tooltipId}
        icon={faInfoCircle}
        size="s"
        className='ms-2 mt-1'
        href="#"
      />
      <UncontrolledTooltip target={tooltipId} >
        {tooltip}
      </UncontrolledTooltip >
    </>
  );
};

export default TooltipButton;
