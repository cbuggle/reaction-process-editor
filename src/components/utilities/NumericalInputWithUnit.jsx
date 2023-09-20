import React from 'react'

import NumericInput from 'react-numeric-input';
import {Label, Row, Col} from "reactstrap";
import SingleLineFormGroup from "./SingleLineFormGroup";

const NumericalInputWithUnit = ({ name, label, value, unitType, onWorkupChange, disabled, step }) => {

  const inputRange = unitType.inputRange
  const stepSize = step ? step : inputRange.step

  const handleNumericInput = (value) => {
    console.log("hanldeNumericinput")
    console.log("name: " + name)
    console.log("value: " + value)
    const changeValue = name ? { name: name, value: value } : value
    onWorkupChange(value)
  }

  const renderInput = () => {
    return (
      <NumericInput
        precision={inputRange.precision}
        step={stepSize}
        value={value}
        min={inputRange.min}
        max={inputRange.max}
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
      <SingleLineFormGroup label={label}>
        <Row className='gx-1'>
          <Col md={5}>
            {renderInput()}
          </Col>
          <Label className='col-7 col-form-label'>
            {unitType.label}
          </Label>
        </Row>
      </SingleLineFormGroup>:
      <div className='numerical-input-with-unit'>
        <div className='numerical-input-with-unit__input'>
          {renderInput()}
        </div>
        <Label className='numerical-input-with-unit__unit'>
          {unitType.label}
        </Label>
      </div>
  )
}

export default NumericalInputWithUnit
