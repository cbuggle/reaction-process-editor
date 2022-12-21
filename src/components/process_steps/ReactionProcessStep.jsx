import React from 'react'

import ProcessStepHeader from './ProcessStepHeader'

const ReactionProcessStep = ({ processStep, onChange }) => {
  return (
    <>
      <ProcessStepHeader processStep={processStep} onChange={onChange} />
    </>
  )
}

export default ReactionProcessStep
