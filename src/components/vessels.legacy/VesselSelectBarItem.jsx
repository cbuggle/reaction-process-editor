import React, { useState } from 'react'

import { Button, Row } from 'reactstrap'

import VesselDecorator from './VesselDecorator'
import VesselModalEdit from './VesselModalEdit'

const VesselSelectBarItem = ({ vessel, vesselOptions, onUpdateVessel, onUnassignVessel }) => {

  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleSave = (vesselForm) => {
    onUpdateVessel(vesselForm)
    toggleModal()
  }

  const renderVesselButton = () => {
    return (
      <Row>
        <div>
          <Button outline onClick={toggleModal}>
            {VesselDecorator.renderVesselLabel(vessel)}
          </Button>
        </div>
        <div className="vessel-details">
          {VesselDecorator.renderVesselDetails(vessel)}
        </div>
      </Row>
    )
  }

  return (
    <div className="vessel-info">
      {renderVesselButton()}
      <VesselModalEdit vessel={vessel} vesselOptions={vesselOptions} isOpen={showModal} onSave={handleSave} onCancel={toggleModal} onDeleteVessel={onUnassignVessel} />
    </div>
  )
}

export default VesselSelectBarItem
