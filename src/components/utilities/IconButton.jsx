import React from 'react'
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ icon, dragRef, className, size, ...props }) => {

  return (
    <Button
      size={size}
      color="transparent"
      className={'icon-button ' + className}
      {...props}
    >
      <div ref={dragRef}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Button>
  )
}

export default IconButton
