
import React from 'react'
import EquipmentBox from './EquipmentBox'

const StepEquipments = ({ processStep }) => {
  return (
    <>
      {processStep.mounted_equipment_options.map((equipment) => {
        return <EquipmentBox key={equipment.label} equipment={equipment} />
      })}
    </>
  )
}

export default StepEquipments
