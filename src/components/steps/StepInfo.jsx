import React from 'react'

import StepEquipments from './header/StepEquipments'
import StepSamples from './header/StepSamples'
import StepVessel from './header/StepVessel'

const StepInfo = ({ processStep }) => {

  return (
    <>
      <StepVessel processStep={processStep} />
      <StepSamples processStep={processStep} />
      <StepEquipments processStep={processStep} />
    </>
  )
}

export default StepInfo
