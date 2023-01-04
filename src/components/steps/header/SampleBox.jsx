import React from 'react'

import { UncontrolledTooltip, PopoverHeader, PopoverBody, } from 'reactstrap'

import SamplesDecorator from '../../samples/SamplesDecorator'

const SampleBox = ({ action }) => {
  return (
    <>
      <div id={"tooltip-sample-" + action.id}>
        {SamplesDecorator.labelForButtonSolvent(action.sample)}
      </div>
      <UncontrolledTooltip placement="top" target={"tooltip-sample-" + action.id} >
        <PopoverHeader>
          {SamplesDecorator.labelForButtonSolvent(action.sample)}
        </PopoverHeader>
        <PopoverBody>
          <div>
            {SamplesDecorator.sampleSvgFile(action.sample)}
          </div>
        </PopoverBody>
      </UncontrolledTooltip>
    </>
  )
}

export default SampleBox
