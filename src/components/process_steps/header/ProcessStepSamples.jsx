import React from 'react'
import MediumBox from './boxes/MediumBox'
import SampleBox from './boxes/SampleBox'
import SolventBox from './boxes/SolventBox'

const ProcessStepSamples = ({ processStep }) => {

  const renderSampleBox = (action) => {
    switch (action.workup['acts_as']) {
      case 'SAMPLE':
        return (<SampleBox key={action.id} action={action} />)
      case 'SOLVENT':
        return (<SolventBox key={action.id} action={action} />)
      case 'MEDIUM':
        return (<MediumBox key={action.id} action={action} />)
      default:
        break;
    }
  }

  return (
    <>
      {
        processStep.actions.map((action) => {
          if (action.action_name === "ADD") {
            return renderSampleBox(action)
          }
        })
      }
    </>
  )
}

export default ProcessStepSamples
