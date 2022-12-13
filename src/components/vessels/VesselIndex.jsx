import React from 'react'

import VesselIndexItem from './VesselIndexItem';

const VesselIndex = ({ vessels, vesselOptions, onAssignVessel, onCloneVessel, onDeleteVessel }) => {
  return (
    <>
      {vessels.map((vessel, idx) => (
        <VesselIndexItem key={idx} vessel={vessel} vesselOptions={vesselOptions} onCloneVessel={onCloneVessel} onAssignVessel={onAssignVessel} onDeleteVessel={onDeleteVessel}  />
      ))}
    </>
  )
}

export default VesselIndex
