import React, {useState} from 'react'
import {FormGroup, Label} from 'reactstrap'
import Select from 'react-select'

import { motionModeOptions, motionTypeOptions } from '../../../constants/dropdownOptions/motionOptions'
import NumericalInputWithUnit from "../../utilities/NumericalInputWithUnit";
import { conditionInputRanges } from "../../../constants/dropdownOptions/conditionsOptions";
import FormButtons from "../../utilities/FormButtons";

const MotionForm = ({ label, findInitialValue, children, onCancel, onSave }) => {
  const resetValue = () => {
    return findInitialValue('value', conditionInputRanges.MOTION.default)
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

  const motionInputRange = conditionInputRanges['MOTION']

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
    onCancel()
  }

  const motionTypeOption = () => {
    return motionTypeOptions.find(option => option.value === motionType)
  }

  const speedStepSize = () => {
    return (
      motionTypeOption() && motionTypeOption().step ?
      motionTypeOption().step :
      100
    )
  }

  return (
    <div className="motion-form">
      <Label>{label}</Label>
      <FormGroup>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="motion_type"
          options={motionTypeOptions}
          value={motionTypeOption()}
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
          label='Speed'
          value={value}
          step={speedStepSize()}
          inputRanges={motionInputRange}
          onWorkupChange={setValue}
        />
      </FormGroup>
      { children }
      <FormButtons
        type='condition'
        onSave={handleSave}
        onCancel={handleCancel}
        saveLabel='Set'
      />
    </div>
  )
}

export default MotionForm
