import React from 'react'
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const IconButton = ( props ) => {
  const icon = props.icon
  let buttonProps = {icon, ...props}
  return(
    <Button size="md" className="icon-button" {...buttonProps}>
      <FontAwesomeIcon size="md" icon={icon} />
    </Button>
  )
}

export default IconButton
