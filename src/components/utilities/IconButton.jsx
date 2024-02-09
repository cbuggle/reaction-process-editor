import React from 'react'
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = (
  {
    icon,
    dragRef,
    className,
    size,
    positive,
    ...props
  }) => {

  return (
    <Button
      size={size}
      color="transparent"
      className={'icon-button ' + (positive ? 'icon-button--positive ' : '') + className}
      {...props}
    >
      <div ref={dragRef}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Button>
  )
}

export default IconButton
