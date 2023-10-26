import React, { useContext, useState } from 'react'
import { FormGroup } from 'reactstrap'
import Select from 'react-select'

import MetricsDecorator from '../../../../decorators/MetricsDecorator';
import NumericalInputWithUnit from "../../../utilities/NumericalInputWithUnit";
import OptionalFormSet from "../OptionalFormSet";

import { SelectOptions } from '../../../views/Reaction';

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

  const selectOptions = useContext(SelectOptions)
  const automationModeOptions = selectOptions.automation_modes
  const motionTypeOptions = selectOptions.motion_types


  const initialValue = () => {
    return findInitialValue('value', MetricsDecorator.defaultValueInDefaultUnit('MOTION'))
  }
  const initialUnit = () => {
    return findInitialValue('unit', MetricsDecorator.defaultUnit('MOTION'))
  }
  const initialMotionType = () => {
    return findInitialValue('motion_type', motionTypeOptions[0].value)
  }
  const initialMotionMode = () => {
    return findInitialValue('automation_mode', automationModeOptions[0].value)
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
      subFormLabel={label}
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
            name="automation_mode"
            options={automationModeOptions}
            value={automationModeOptions.find(option => option.value === motionMode)}
            onChange={selectedOption => setMotionMode(selectedOption.value)}
          />
        </FormGroup>
        {/* include slider */}
        <FormGroup>
          <NumericalInputWithUnit
            label={MetricsDecorator.label('MOTION')}
            value={value}
            unitType={MetricsDecorator.defaultUnitType('MOTION')}
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
