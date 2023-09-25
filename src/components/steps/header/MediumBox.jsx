import React from 'react'
import { PopoverHeader, UncontrolledTooltip } from 'reactstrap'

const MediumBox = ({ material }) => {
  return (
    <>
      <div id={"tooltip-medium-" + material.id}>
        {material.label}
      </div>
      < UncontrolledTooltip placement="top" target={"tooltip-medium-" + material.id} >
        <PopoverHeader>
          {material.label}
        </PopoverHeader>
      </UncontrolledTooltip >
    </>
  )
}

export default MediumBox
