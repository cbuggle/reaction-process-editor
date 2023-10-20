import React from 'react'

import StepEquipments from './header/StepEquipments'
import StepSamples from './header/StepSamples'
import StepVessel from './header/StepVessel'

const StepInfo = ({ processStep }) => {

  return (
    <>
      <StepVessel vessel={processStep.vessel} />
      <StepSamples />
      <StepEquipments />
    </>
  )
}

export default StepInfo
