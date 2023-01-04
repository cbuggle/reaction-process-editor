import React from 'react'

const EquipmentBox = ({ action }) => {
  return (
    <div>
      {action.workup['equipment']}
    </div>
  )
}

export default EquipmentBox
