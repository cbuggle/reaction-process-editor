import React, { useEffect, useState } from 'react'
import { ListGroupItem, Row, Col, Label } from 'reactstrap'
import Select from 'react-select'

import { equipmentMountOptions } from '../../../constants/dropdownOptions/equipmentOptions'
import ActionFormGroup from "./ActionFormGroup";

const EquipmentForm = ({ action, onWorkupChange, processStep }) => {

  const [equipmentOptions, setEquipmentOptions] = useState([])

  useEffect(() => {
    changeMountOption(action.workup['mount_action'])
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
          value={equipmentMountOptions.find(option => option.value === action.workup['mount_action'])}
          onChange={selectedOption => changeMountOption(selectedOption.value)}
        />
      </ActionFormGroup>
      <ActionFormGroup label='Equipment'>
        <Select
          name="equipment"
          options={equipmentOptions}
          value={equipmentOptions.find(option => option.value === action.workup['equipment'])}
          onChange={selectedOption => onWorkupChange({ name: 'equipment', value: selectedOption.value })}
        />
      </ActionFormGroup>
    </>
  )
}

export default EquipmentForm
