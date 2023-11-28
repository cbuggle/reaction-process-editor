import React from 'react'

import StepEquipments from './header/StepEquipments'
import StepSamples from './header/StepSamples'

import VesselModalButton from '../vessels/VesselModalButton'

const StepInfo = ({ processStep }) => {

  return (
    <>
      <VesselModalButton />
      <StepSamples />
      <StepEquipments />
    </>
  )
}

export default StepInfo
