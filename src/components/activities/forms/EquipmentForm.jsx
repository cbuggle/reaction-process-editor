import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import { equipmentMountOptions } from '../../../constants/dropdownOptions/equipmentOptions'

const EquipmentForm = ({ activity, onWorkupChange, processStep }) => {

  const equipmentOptions = () => {
    if (activity.workup['mount_action'] === "MOUNT") {
      return processStep.equipment_options
    } else {
      return processStep.mounted_equipment_options
    }
  }

  return (
    <>
      <SingleLineFormGroup label='Equipment'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="equipment"
          options={equipmentOptions()}
          value={equipmentOptions().find(option => option.value === activity.workup['equipment'])}
          onChange={selectedOption => onWorkupChange({ name: 'equipment', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
    </>
  )
}

export default EquipmentForm
