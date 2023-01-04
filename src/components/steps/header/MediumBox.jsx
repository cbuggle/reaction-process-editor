import React from 'react'
import { PopoverHeader, UncontrolledTooltip } from 'reactstrap'

const MediumBox = ({ action }) => {
  return (
    <>
      <div id={"tooltip-medium-" + action.id}>
        {action.medium.label}
      </div>
      < UncontrolledTooltip placement="top" target={"tooltip-medium-" + action.id} >
        <PopoverHeader>
          {action.medium.label}
        </PopoverHeader>
      </UncontrolledTooltip >
    </>
  )
}

export default MediumBox
