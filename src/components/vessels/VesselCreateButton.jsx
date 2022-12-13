import React, { useState } from 'react'
import { Button } from 'reactstrap'

import VesselModalCreate from './VesselModalCreate'

const VesselCreateButton = ({ onCreate, vesselOptions, vesselIndex, onDeleteVessel, onAssignVessel }) => {

  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleSave = (vesselForm, saveAsTemplate) => {
    onCreate(vesselForm, saveAsTemplate)
    toggleModal()
  }

  const emptyFormVessel = {
    // ruby style snake case to match the data stored and delivered from backend. cbuggle, 08.07.2021
    name: '',
    vessel_type: "UNSPECIFIED",
    details: '',
    volume_amount: '',
    volume_unit: "UNSPECIFIED",
    material_type: 'UNSPECIFIED',
    material_details: '',
    environment_type: 'UNSPECIFIED',
    environment_details: '',
    automation_type: "UNSPECIFIED",
    attachments: [],
    preparations: ''
  }


  return (
    <div>
      <Button color="outline-success" size="sm" onClick={toggleModal}>
        + Vessel
      </Button>
      <VesselModalCreate vessel={emptyFormVessel} vesselIndex={vesselIndex} vesselOptions={vesselOptions} isOpen={showModal} onCreate={handleSave} onCancel={toggleModal} onDeleteVessel={onDeleteVessel} onAssignVessel={onAssignVessel} />
    </div>
  )
}

export default VesselCreateButton
