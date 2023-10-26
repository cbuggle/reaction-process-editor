
import React, { useContext } from 'react'
import EquipmentBox from './EquipmentBox'

import { StepSelectOptions } from '../../../contexts/StepSelectOptions'

const StepEquipments = () => {

  const stepSelectOptions = useContext(StepSelectOptions)
  return (
    <>
      {stepSelectOptions.mounted_equipment.map((equipment) => {
        return <EquipmentBox key={equipment.label} equipment={equipment} />
      })}
    </>
  )
}

export default StepEquipments
