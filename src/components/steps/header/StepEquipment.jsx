
import React from 'react'
import EquipmentBox from './EquipmentBox'

const StepEquipment = ({ processStep }) => {
  return (
    <>
      {processStep.actions.map((action) => {
        if (action.workup['mount_action'] === 'MOUNT') {
          return <EquipmentBox key={action.id} action={action} />
        }
        return null;
      })
      }
    </>
  )
}

export default StepEquipment
