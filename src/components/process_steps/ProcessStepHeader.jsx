import React from 'react'

import { Card, CardBody, CardHeader, } from 'reactstrap'
import ProcessStepEquipment from './header/ProcessStepEquipment'
import ProcessStepSamples from './header/ProcessStepSamples'
import ProcessStepVessel from './header/ProcessStepVessel'
import ProcessStepDeleteButton from './ProcessStepDeleteButton'

const ProcessStepHeader = ({ processStep, onChange }) => {
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
