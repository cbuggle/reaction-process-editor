import React, { useState } from 'react'
import { FormGroup } from 'reactstrap'
import Select from 'react-select'

import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';
import NumericalInputWithUnit from "../../utilities/NumericalInputWithUnit";
import OptionalFormSet from "./OptionalFormSet";

import { motionModeOptions, motionTypeOptions } from '../../../constants/dropdownOptions/motionOptions'

const MotionForm = (
  {
    label,
    valueSummary,
    openSubFormLabel,
    findInitialValue,
    children,
    onSave,
    onToggleSubform
  }) => {

  const initialValue = () => {
    return findInitialValue('value', ConditionTypeDecorator.defaultValueInDefaultUnit('MOTION'))
  }
  const initialUnit = () => {
    return findInitialValue('unit', ConditionTypeDecorator.defaultUnit('MOTION'))
  }
  const initialMotionType = () => {
    return findInitialValue('motion_type', motionTypeOptions[0])
  }
  const initialMotionMode = () => {
    return findInitialValue('motion_mode', motionModeOptions[0])
  }

  const [value, setValue] = useState(initialValue())
  const [unit, setUnit] = useState(initialUnit())
  const [motionType, setMotionType] = useState(initialMotionType())
  const [motionMode, setMotionMode] = useState(initialMotionMode())

  const resetFormData = () => {
    setValue(initialValue())
    setUnit(initialUnit())
    setMotionType(initialMotionType())
    setMotionMode(initialMotionMode())
  }

  /* use for slider input
  const handleRpmSliderChange = (event) => {
    setValue(event.target.value)
  }*/

  const handleSave = () => {
    onSave(
      {
        value: value,
        unit: unit,
        motion_type: motionType,
        motion_mode: motionMode
      }
    )
  }

  const handleCancel = () => {
    resetFormData()
  }

  const currentMotionTypeOption = () => {
    return motionTypeOptions.find(option => option.value === motionType)
  }

  const velocityStepSize = () => {
    return (
      currentMotionTypeOption() && currentMotionTypeOption().step ?
        currentMotionTypeOption().step :
        100
    )
  }

  return (
    <OptionalFormSet
      groupLabel={label}
      valueSummary={valueSummary}
      openSubFormLabel={openSubFormLabel}
      onSave={handleSave}
      onCancel={handleCancel}
      onToggleSubform={onToggleSubform}
    >
      <div className="motion-form">
        <FormGroup>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="motion_type"
            options={motionTypeOptions}
            value={currentMotionTypeOption()}
            onChange={selectedOption => setMotionType(selectedOption.value)}
          />
        </FormGroup>
        <FormGroup>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="motion_mode"
            options={motionModeOptions}
            value={motionModeOptions.find(option => option.value === motionMode)}
            onChange={selectedOption => setMotionMode(selectedOption.value)}
          />
        </FormGroup>
        {/* include slider */}
        <FormGroup>
          <NumericalInputWithUnit
            label={ConditionTypeDecorator.label('MOTION')}
            value={value}
            unitType={ConditionTypeDecorator.defaultUnitType('MOTION')}
            step={velocityStepSize()}
            onChange={setValue}
          />
        </FormGroup>
        {children}
      </div>
    </OptionalFormSet>
  )
}

export default MotionForm
