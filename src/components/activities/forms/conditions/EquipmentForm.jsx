import React, { useState } from 'react'
import Select from 'react-select'

import { FormGroup } from "reactstrap";
import OptionalFormSet from "../OptionalFormSet";

const EquipmentForm = (
  {
    label,
    valueSummary,
    openSubFormLabel,
    findInitialValue,
    equipmentOptions,
    onSave,
    onToggleSubform
  }) => {
  const resetEquipment = () => {
    return findInitialValue('value', undefined)
  }

  const [equipment, setEquipment] = useState(resetEquipment())

  const handleSave = () => {
    onSave(
      {
        value: equipment
      }
    )
  }

  const handleCancel = () => {
    setEquipment(resetEquipment())
  }

  return (
    <OptionalFormSet
      subFormLabel={label}
      valueSummary={valueSummary}
      openSubFormLabel={openSubFormLabel}
      onSave={handleSave}
      onCancel={handleCancel}
      onToggleSubform={onToggleSubform}
    >
      <FormGroup>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="equipment"
          isMulti
          options={equipmentOptions}
          value={equipmentOptions.filter(option => (equipment || []).includes(option.value))}
          onChange={selectedOptions => setEquipment(selectedOptions.map(option => option.value))}
        />
      </FormGroup>
    </OptionalFormSet>
  )
}

export default EquipmentForm
