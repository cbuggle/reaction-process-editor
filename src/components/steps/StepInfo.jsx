import React from 'react'

import Action from '../actions/Action';

import StepEquipment from './header/StepEquipment'
import StepSamples from './header/StepSamples'
import StepVessel from './header/StepVessel'

const StepInfo = ({ processStep, onChange }) => {
  return (
    <>
      <StepVessel processStep={processStep} />
      <StepSamples processStep={processStep} />
      <StepEquipment processStep={processStep} />
      {processStep.actions.map(action => (
        <Action key={action.id} action={action} processStep={processStep} onChange={onChange} />
      ))}
      <Action action={{ workup: {} }} processStep={processStep} onChange={onChange} />
    </>
  )
}

export default StepInfo
