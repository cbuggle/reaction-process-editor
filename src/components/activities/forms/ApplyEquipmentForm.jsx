import React, { useState, useMemo } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import Select from 'react-select'

import PropTypes from 'prop-types'

const ApplyEquipmentForm = ({ action, onWorkupChange, processStep }) => {

  const equipmentOptions = useMemo(() => {
    if (action.action_name == 'CONDITION') {
      return processStep.action_equipment_options['CONDITION'][action.workup['condition_type']]
    } else {
      return processStep.action_equipment_options[action.action_name]
    }
  })

  const [applyExtraEquipment, setApplyExtraEquipment] = useState(action.workup['apply_extra_equipment'])

  const handleCheckbox = (event) => {
    setApplyExtraEquipment(event.target.checked)
    onWorkupChange({ name: 'apply_extra_equipment', value: event.target.checked })

    if (!event.target.checked) {
      onWorkupChange({ name: 'equipment', value: "" })

    }
  }

  return (
    <>
      <FormGroup check className='mb-3'>
        <Label check>
          <Input type="checkbox" checked={action.workup['apply_extra_equipment']} onChange={handleCheckbox} />
          Apply Extra Equipment
        </Label>
      </FormGroup>
      {applyExtraEquipment &&
        <FormGroup>
          <Select
            isMulti
            name="equipment"
            options={equipmentOptions}
            value={equipmentOptions.filter(option => (action.workup['equipment'] || []).includes(option.value))}
            onChange={selectedOptions => onWorkupChange({ name: 'equipment', value: selectedOptions.map(option => option.value) })}
          />
        </FormGroup>
      }
    </>
  )
}

ApplyEquipmentForm.propTypes = {
  action: PropTypes.object.isRequired,
  onWorkupChange: PropTypes.func.isRequired
}

export default ApplyEquipmentForm
