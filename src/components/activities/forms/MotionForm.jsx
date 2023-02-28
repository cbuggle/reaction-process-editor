import React from 'react'
import {FormGroup, Label} from 'reactstrap'
import Select from 'react-select'

import { motionModeOptions, motionTypeOptions } from '../../../constants/dropdownOptions/motionOptions'
import NumericalInputWithUnit from "../../utilities/NumericalInputWithUnit";
import {conditionInputRanges} from "../../../constants/dropdownOptions/conditionsOptions";

const MotionForm = ({ label, workup, onWorkupChange }) => {
  const motionInputRange = conditionInputRanges['MOTION']
  const handleRpmNumericInput = (value) => {
    onWorkupChange({ name: 'motion_speed', value: value })
  }

  const handleRpmSliderChange = (event) => {
    onWorkupChange({ name: 'motion_speed', value: event.target.value })
  }

  const sliderStep = () => {
    if(motionTypeOptions.find(option => option.value === workup.motion_type)) {
      return motionTypeOptions.find(option => option.value === workup.motion_type).step
    } else {
      return undefined
    }
  }

  return (
    <div className="motion-form">
      <Label>{label}</Label>
      <FormGroup>
        <Select
          name="motion_mode"
          options={motionTypeOptions}
          value={motionTypeOptions.find(option => option.value === workup.motion_type) || motionTypeOptions[0]}
          onChange={selectedOption => onWorkupChange({ name: 'motion_type', value: selectedOption.value })}
        />
      </FormGroup>
      <FormGroup>
        <Select
          name="motion_mode"
          options={motionModeOptions}
          value={motionModeOptions.find(option => option.value === workup.motion_mode) || motionModeOptions[0]}
          onChange={selectedOption => onWorkupChange({ name: 'motion_mode', value: selectedOption.value })}
        />
      </FormGroup>
      <FormGroup>
        <NumericalInputWithUnit
          label='Speed'
          value={workup.motion_speed}
          inputRanges={motionInputRange}
          onWorkupChange={handleRpmNumericInput}
        />
      </FormGroup>
    </div>
  )
}

export default MotionForm
