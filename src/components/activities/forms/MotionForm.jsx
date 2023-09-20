import React, { useState } from 'react'
import { FormGroup } from 'reactstrap'
import Select from 'react-select'

import { motionModeOptions, motionTypeOptions } from '../../../constants/dropdownOptions/motionOptions'
import NumericalInputWithUnit from "../../utilities/NumericalInputWithUnit";
import OptionalFormSet from "./OptionalFormSet";

import { conditionTypes } from '../../../constants/conditionTypes';

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


  // Hardcoded until we implement unit switching.
  const currentMotionUnit = () => { return conditionTypes['MOTION'].defaultUnit }

  const resetValue = () => {
    return findInitialValue('value', conditionTypes['MOTION'].unitTypes[currentMotionUnit()].default)
  }
  const resetMotionType = () => {
    return findInitialValue('motion_type', motionTypeOptions[0])
  }
  const resetMotionMode = () => {
    return findInitialValue('motion_mode', motionModeOptions[0])
  }
  const [value, setValue] = useState(resetValue())
  const [motionType, setMotionType] = useState(resetMotionType())
  const [motionMode, setMotionMode] = useState(resetMotionMode())

  const resetFormData = () => {
    setValue(resetValue())
    setMotionType(resetMotionType())
    setMotionMode(resetMotionMode())
  }

  /* use for slider input
  const handleRpmSliderChange = (event) => {
    setValue(event.target.value)
  }*/

  const handleSave = () => {
    onSave(
      {
        value: value,
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
            label={conditionTypes['MOTION'].label}
            value={value}
            step={velocityStepSize()}
            unitType={conditionTypes['MOTION'].unitTypes[currentMotionUnit()]}
            onWorkupChange={setValue}
          />
        </FormGroup>
        {children}
      </div>
    </OptionalFormSet>
  )
}

export default MotionForm
