import React from 'react'

import { UncontrolledTooltip, PopoverHeader, PopoverBody, } from 'reactstrap'

import SamplesDecorator from '../../../decorators/SamplesDecorator'

const SampleBox = ({ material }) => {
  return (
    <>
      <div id={"tooltip-sample-" + material.id}>
        {material.label}
      </div>
      <UncontrolledTooltip placement="top" target={"tooltip-sample-" + material.id} >
        <PopoverHeader>
          {material.label}
        </PopoverHeader>
        <PopoverBody>
          <div>
            {SamplesDecorator.sampleSvgFile(material)}
          </div>
        </PopoverBody>
      </UncontrolledTooltip>
    </>
  )
}

export default SampleBox
