
import React from 'react'

import { Button } from 'reactstrap'
import VesselDecorator from '../../vessels/VesselDecorator'

const StepVessel = ({ processStep }) => {
  return (
    <Button size="sm" color="outline-secondary" disabled>
      {VesselDecorator.renderVesselProcessStepInfo(processStep.vessel)}
    </Button>
  )
}

export default StepVessel
