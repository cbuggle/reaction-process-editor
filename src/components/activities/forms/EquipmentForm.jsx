import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import ActionFormGroup from "./ActionFormGroup";
import { equipmentMountOptions } from '../../../constants/dropdownOptions/equipmentOptions'

const EquipmentForm = ({ activity, onWorkupChange, processStep }) => {

  const [equipmentOptions, setEquipmentOptions] = useState([])

  useEffect(() => {
    changeMountOption(activity.workup['mount_action'])
  }, [])

  const changeMountOption = (value) => {
    if (value === "MOUNT") {
      setEquipmentOptions(processStep.equipment_options)
    } else {
      setEquipmentOptions(processStep.mounted_equipment_options)
    }

    onWorkupChange({ name: 'mount_action', value: value })
  }

  return (
    <>
      <ActionFormGroup label='Replacement Medium'>
        <Select
          name="mount_action"
          options={equipmentMountOptions}
          value={equipmentMountOptions.find(option => option.value === activity.workup['mount_action'])}
          onChange={selectedOption => changeMountOption(selectedOption.value)}
        />
      </ActionFormGroup>
      <ActionFormGroup label='Equipment'>
        <Select
          name="equipment"
          options={equipmentOptions}
          value={equipmentOptions.find(option => option.value === activity.workup['equipment'])}
          onChange={selectedOption => onWorkupChange({ name: 'equipment', value: selectedOption.value })}
        />
      </ActionFormGroup>
    </>
  )
}

export default EquipmentForm
