import React, { useEffect, useState } from 'react'
import { Button } from "reactstrap";

import VialSelectDecorator from '../../decorators/VialSelectDecorator'

const VialButton = (
  {
    vial,
    onClick,
    noOfGroups
  }) => {

  const [group, setGroup] = useState(0)

  useEffect(() => {
    if (group > noOfGroups) {
      setGroup(0)
    }
  }, [group, noOfGroups])


  const handleClick = () => {
    let newGroup = ((group || 0) + 1) % noOfGroups
    setGroup(newGroup)
    onClick(newGroup)
  }

  const colorStyle = vial ? VialSelectDecorator.colorFor(group) : "transparent"

  return (
    <Button className="circle-button m-1"
      disabled={!vial}

      style={{ backgroundColor: colorStyle }}
      onClick={handleClick}>
      {vial}
    </Button>
  )
}

export default VialButton
