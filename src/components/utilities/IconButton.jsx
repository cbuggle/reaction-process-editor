import React from 'react'
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = (props) => {
  const icon = props.icon
  const dragRef = props.dragRef
  let buttonProps = { icon, ...props }

  return (
    <Button size="md" className="icon-button" {...buttonProps}>
      <div ref={dragRef}>
        <FontAwesomeIcon size="md" icon={icon} />
      </div>
    </Button>
  )
}

export default IconButton
