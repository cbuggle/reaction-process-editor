import React from 'react'
import { PopoverHeader, UncontrolledTooltip } from 'reactstrap'

const SolventBox = ({ material }) => {
  return (
    <>
      <div id={"tooltip-sample-" + material.id}>
        {material.label}
      </div>
      <UncontrolledTooltip placement="top" target={"tooltip-sample-" + material.id} >
        <PopoverHeader>
          {material.label}
        </PopoverHeader>
      </UncontrolledTooltip >
    </>
  )
}

export default SolventBox
