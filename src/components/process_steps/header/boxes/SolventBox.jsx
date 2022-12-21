import React from 'react'
import { PopoverBody, PopoverHeader, UncontrolledTooltip } from 'reactstrap'

import SamplesDecorator from '../../../samples/SamplesDecorator'

const SolventBox = ({ action }) => {
  return (
    <>
      <div id={"tooltip-sample-" + action.id}>
        {SamplesDecorator.labelForButtonSolvent(action.sample)}
      </div>
      <UncontrolledTooltip placement="top" target={"tooltip-sample-" + action.id} >
        <PopoverHeader>
          {SamplesDecorator.labelForButtonSolvent(action.sample)}
        </PopoverHeader>
      </UncontrolledTooltip >
    </>
  )
}

export default SolventBox
