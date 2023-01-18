import React from 'react'

import StepEquipment from './header/StepEquipment'
import StepSamples from './header/StepSamples'
import StepVessel from './header/StepVessel'

const StepInfo = ({ processStep, onChange }) => {
  return (
    <>
      <StepVessel processStep={processStep} />
      <StepSamples processStep={processStep} />
      <StepEquipment processStep={processStep} />
    </>
  )
}

export default StepInfo
