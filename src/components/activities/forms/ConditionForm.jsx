import React, { useState } from 'react'
import { conditionTypes } from "../../../constants/conditionTypes";
import ActivityForm from "./ActivityForm";
import ConditionTypeFormGroup from "./ConditionTypeFormGroup";

import Select from 'react-select'
import { FormGroup, Label } from 'reactstrap'

const ConditionForm = (
  {
    activity,
    processStep,
    preConditions,
    onSave,
    onCancel,
    onWorkupChange
  }) => {

  const [focus, setFocus] = useState(false);
  const formDimensions = conditionTypes
  const toggleFocus = () => {
    setFocus(!focus)
  }

  return (
    <ActivityForm
      type='condition'
      activity={activity}
      onSave={onSave}
      onCancel={onCancel}
      onWorkupChange={onWorkupChange}
      className={focus ? 'condition-form--focus' : ''}
    >
      <FormGroup>
        <Label>
          Mount Equipment
        </Label>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="equipment"
          isMulti
          options={processStep.equipment_options}
          value={processStep.equipment_options.filter(option => (activity.workup['equipment'] || []).includes(option.value))}
          onChange={selectedOptions => onWorkupChange({ name: 'equipment', value: selectedOptions.map(option => option.value) })}
        />
      </FormGroup>
      {
        formDimensions.map(type => (
          <ConditionTypeFormGroup
            key={type.action.workup.condition_type}
            type={type}
            processStep={processStep}
            preCondition={preConditions[type.action.workup.condition_type]}
            workup={activity.workup}
            onWorkupChange={onWorkupChange}
            onToggleFocus={toggleFocus}
          />
        ))
      }
    </ActivityForm>
  )
}

export default ConditionForm
