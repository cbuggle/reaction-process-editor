import React, { useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import Select from 'react-select'
import FormSection from "../../utilities/FormSection";

const ApplyEquipmentForm = ({ equipment,  equipmentOptions, onChangeEquipment, activityType='action' }) => {

  const [applyExtraEquipment, setApplyExtraEquipment] = useState(!!equipment && equipment.length > 0)

  const handleCheckbox = (event) => {
    setApplyExtraEquipment(event.target.checked)

    if (!event.target.checked) {
      onChangeEquipment([])
    }
  }

  return (
    <FormSection type={activityType}>
      <FormGroup check className='mb-3'>
        <Label check>
          <Input type="checkbox" checked={applyExtraEquipment} onChange={handleCheckbox} />
          Apply Extra Equipment
        </Label>
      </FormGroup>
      {applyExtraEquipment &&
        <FormGroup>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            isMulti
            name="equipment"
            options={equipmentOptions}
            value={equipmentOptions.filter(option => (equipment || []).includes(option.value))}
            onChange={selectedOptions => onChangeEquipment(selectedOptions.map(option => option.value))}
          />
        </FormGroup>
      }
    </FormSection>
  )
}

export default ApplyEquipmentForm
