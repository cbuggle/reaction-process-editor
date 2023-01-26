import React from 'react'
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ icon, dragRef, ...props }) => {

  return (
    <Button size="md" className="icon-button" {...props}>
      <div ref={dragRef}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Button>
  )
}

export default IconButton
