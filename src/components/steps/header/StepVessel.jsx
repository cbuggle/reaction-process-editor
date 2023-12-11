
import React from 'react'
import { Button } from 'reactstrap'
import VesselModalButton from '../../vessels/VesselModalButton'

import VesselDecorator from '../../vessels.legacy/VesselDecorator'
import { useReactionsFetcher } from '../../../fetchers/ReactionsFetcher'


const StepVessel = ({ processStep }) => {

  const api = useReactionsFetcher()

  const vessel = processStep?.vessel

  const assignVessel = (vesselId) => api.assignProcessStepVessel(processStep.id, vesselId)

  const unassignVessel = () => api.assignProcessStepVessel(processStep.id)

  return (
    <>
      {VesselDecorator.renderVesselProcessStepInfo(vessel)}
      {vessel && <Button color="outline-secondary" onClick={unassignVessel}>Unassign</Button>}
      <VesselModalButton onSelectVessel={assignVessel} />
    </>
  )
}

export default StepVessel
