
import React from 'react'

import { Button } from 'reactstrap'
import VesselDecorator from '../../vessels/VesselDecorator'

const StepVessel = ({ vessel }) => {
  return (
    <Button size="sm" color="outline-secondary" disabled>
      {VesselDecorator.renderVesselProcessStepInfo(vessel)}
    </Button>
  )
}

export default StepVessel
