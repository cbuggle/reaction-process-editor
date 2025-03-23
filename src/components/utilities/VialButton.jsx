import React from 'react'
import { Button } from "reactstrap";

import VialSelectDecorator from '../../decorators/VialSelectDecorator'

const VialButton = (
  {
    vial,
    onClick
  }) => {

  const colorStyle = vial.id ? VialSelectDecorator.colorFor(vial.group) : "transparent"

  return (
    <Button className="circle-button m-1"
      disabled={!vial.id}

      style={{ backgroundColor: colorStyle }}
      onClick={onClick}>
      {vial.id}
      <br />
      {vial.group}
    </Button>
  )
}

export default VialButton
