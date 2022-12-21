
import React from 'react'
import EquipmentBox from './boxes/EquipmentBox'

const ProcessStepEquipment = ({ processStep }) => {
   return (
    <>
      {processStep.actions.map((action) => {
        if (action.workup['mount_action'] === 'MOUNT') {
          return (<EquipmentBox key={action.id} action={action} />)
        }
      })
      }
    </>
  )
}

export default ProcessStepEquipment
