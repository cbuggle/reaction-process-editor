import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faCopy } from '@fortawesome/free-solid-svg-icons'

import { Button } from 'reactstrap'

import VesselDecorator from './VesselDecorator'

const VesselIndexItem = ({ vessel, onAssignVessel, onCloneVessel, onDeleteVessel }) => {

  const confirmDelete = () => {

    window.confirm('This will irreversably delete the Template. Are you sure?')
      && onDeleteVessel(vessel)
  }

  return (
    <div className="vessel-index-item">
      <div className="vessel-index-item-buttons">
        <Button type="button" size="xs" className="vessel-index-button" color="danger" onClick={confirmDelete}>X</Button>
        <Button type="button" size="xs" color="success" className="vessel-index-button float-right" onClick={() => onCloneVessel(vessel)}>
          <FontAwesomeIcon icon={faCopy} /> Prefill Form
        </Button>
        <Button type="button" size="xs" color="outline-primary" className="vessel-index-button float-right" onClick={() => onAssignVessel(vessel.id)}>
          <FontAwesomeIcon icon={faShare} size="lg" />Use
        </Button>
      </div>

      <div className="vessel-index-item-vessel-info">
        {VesselDecorator.renderVesselTypeIcon(vessel)}
      </div>
      <div className="vessel-index-item-vessel-info">
        {VesselDecorator.renderVesselDetails(vessel)}

      </div>

    </div>
  )
}

export default VesselIndexItem
