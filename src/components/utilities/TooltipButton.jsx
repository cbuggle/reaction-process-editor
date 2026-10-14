import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const TooltipButton = ({ tooltip, color, size }) => {
  return (
    <span title={tooltip}>
      <FontAwesomeIcon
        icon={faInfoCircle}
        size={size || "sm"}
        className='ms-2 mt-1 text-danger'
        href="#"
      />
    </span>
  );
};

export default TooltipButton;
