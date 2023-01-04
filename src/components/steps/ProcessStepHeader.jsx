import React from 'react'

import { Card, CardBody, CardHeader, } from 'reactstrap'
import ProcessStepEquipment from '../process_steps/header/ProcessStepEquipment'
import ProcessStepSamples from '../process_steps/header/ProcessStepSamples'
import ProcessStepVessel from '../process_steps/header/ProcessStepVessel'
import ProcessStepDeleteButton from './StepDeleteButton'

const ProcessStepHeader = ({ processStep, onChange }) => {
  // Obsolete & probably unused; CardHeader is migrated to UX rewrite. CardBody not.
  // Keeping for reference.
  return (
    <Card>
      <CardHeader>
        {processStep.step_number} / {processStep.total_steps}
        {processStep.name}
        <ProcessStepDeleteButton processStep={processStep} onDelete={onChange}/>
      </CardHeader>
      <CardBody>
        <ProcessStepVessel processStep={processStep} />
        <ProcessStepSamples processStep={processStep} />
        <ProcessStepEquipment processStep={processStep} />
      </CardBody>
    </Card>
  )
}

export default ProcessStepHeader
