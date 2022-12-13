import React, { useState } from 'react'

import { Label, Button } from 'reactstrap'

import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../constants/dndItemTypes'

import VesselDecorator from '../vessels/VesselDecorator'
import VesselModalEdit from './VesselModalEdit'



const VesselStepHeader = ({ processStep, vesselOptions, onSaveVessel }) => {

  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const handleSave = (vesselForm) => {
    onSaveVessel(vesselForm)
    toggleModal()
  }

  /* React-DnD drag source */
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.STEP_VESSEL,
    item: { processStepId: processStep.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <div>
      <Label>
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, fontWeight: 'bold', cursor: 'move' }}>
          <Button size="sm" color="outline-secondary" onClick={toggleModal} disabled={!processStep.vessel}>
            {VesselDecorator.renderVesselProcessStepInfo(processStep.vessel)}
          </Button>

          {processStep.vessel ? <VesselModalEdit vessel={processStep.vessel} vesselOptions={vesselOptions} isOpen={showModal} onSave={handleSave} onCancel={toggleModal} /> : <></> }

        </div>
      </Label>
    </div>
  )
}

export default VesselStepHeader
