import React, { useContext } from 'react'
import Select from 'react-select'

import { SelectOptions } from '../../../../contexts/SelectOptions';

const EquipmentSubsetForm = (
  {
    metricName,
    equipment,
    onChangeEquipment
  }) => {

  const selectOptions = useContext(SelectOptions)
  const localEquipmentOptions = selectOptions.activity_type_equipment['CONDITION'][metricName]
  const localEquipmentOptionNames = localEquipmentOptions.map(item => item.value)

  const handleChangeEquipment = (localEquipment) => {
    onChangeEquipment(
      equipment
        .filter(item => !localEquipmentOptionNames.includes(item))
        .concat(localEquipment))
  }

  return (
    <>
      <Select
        className="react-select--overwrite"
        classNamePrefix="react-select"
        isMulti
        isClearable={false}
        name="equipment"
        options={localEquipmentOptions}
        value={localEquipmentOptions.filter(option => equipment.includes(option.value))}
        onChange={selectedOptions => handleChangeEquipment(selectedOptions.map(option => option.value))}
      />
    </>
  )
}

export default EquipmentSubsetForm
