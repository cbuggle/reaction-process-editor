import React from 'react'

import NumericInput from 'react-numeric-input';
import {Label, Row, Col} from "reactstrap";
import ActionFormGroup from "../activities/forms/ActionFormGroup";

const NumericalInputWithUnit = ({ inputRanges, label, name, value, onWorkupChange, disabled, step }) => {
  const stepSize = step ? step : inputRanges.step
  const handleNumericInput = (value) => {
    const changeValue = name ? { name: name, value: value } : value
    onWorkupChange(changeValue)
  }

  const renderInput = () => {
    return (
      <NumericInput
        precision={inputRanges.precision}
        step={stepSize}
        value={value}
        min={inputRanges.min}
        max={inputRanges.max}
        size={8}
        disabled={disabled}
        onChange={handleNumericInput}
        className='form-control'
        snap
      />
    )
  }

  return (
    label ?
      <ActionFormGroup label={label}>
        <Row className='gx-1'>
          <Col md={5}>
            {renderInput()}
          </Col>
          <Label className='col-7 col-form-label'>
            {inputRanges.unit}
          </Label>
        </Row>
      </ActionFormGroup>:
      <div className='numerical-input-with-unit'>
        <div className='numerical-input-with-unit__input'>
          {renderInput()}
        </div>
        <Label className='numerical-input-with-unit__unit'>
          {inputRanges.unit}
        </Label>
      </div>
  )
}

export default NumericalInputWithUnit
