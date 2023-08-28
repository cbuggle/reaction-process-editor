import React, { useState } from 'react'
import Select from 'react-select'

import { Label, FormGroup } from "reactstrap";
import FormButtons from "../../utilities/FormButtons";

const EquipmentForm = ({ label, findInitialValue, equipmentOptions, onCancel, onSave }) => {
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
    onCancel()
  }

  return (
    <>
      <Label>{label}</Label>
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
      <FormButtons
        type='condition'
        onSave={handleSave}
        onCancel={handleCancel}
        saveLabel='Set'
      />
    </>
  )
}

export default EquipmentForm
