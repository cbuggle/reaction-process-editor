import React from 'react';

import { UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { uniqueId } from 'react-bootstrap-typeahead/types/utils';

const TooltipButton = ({ tooltip }) => {
  let tooltipId = uniqueId('tooltip-')

  return (
    <>
      <FontAwesomeIcon
        id={tooltipId}
        icon={faInfoCircle}
        size="sm"
        className='ms-2 mt-1'
        href="#"
      />
      <UncontrolledTooltip
        target={tooltipId}>
        {tooltip}
      </UncontrolledTooltip >
    </>
  );
};

export default TooltipButton;
