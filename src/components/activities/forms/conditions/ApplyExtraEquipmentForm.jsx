import React, { useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import Select from 'react-select'
import OptionsDecorator from '../../../../decorators/OptionsDecorator'

const ApplyExtraEquipmentForm = (
  {
    equipment,
    equipmentOptions,
    onChangeEquipment
  }) => {

  const equipmentAvailable = equipmentOptions && (equipmentOptions.length > 0)
  const [applyExtraEquipment, setApplyExtraEquipment] = useState(!!equipment && equipment.length > 0)

  const handleCheckbox = (event) => {
    setApplyExtraEquipment(event.target.checked)

    if (!event.target.checked) {
      onChangeEquipment([])
    }
  }

  return (
    <>
      {equipmentAvailable &&
        <FormGroup check className='mb-3'>
          <Label check>
            <Input type="checkbox" checked={applyExtraEquipment} onChange={handleCheckbox} />
             Extra Equipment
          </Label>
        </FormGroup>
      }
      {equipmentAvailable && applyExtraEquipment &&
        <FormGroup>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            isMulti
            name="equipment"
            options={equipmentOptions}
            value={OptionsDecorator.optionsForKeys(equipment, equipmentOptions)}
            onChange={selectedOptions => onChangeEquipment(selectedOptions.map(option => option.value))}
          />
        </FormGroup>
      }

    </>
  )
}

export default ApplyExtraEquipmentForm
