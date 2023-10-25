import React from 'react'
import { Label, Row, Col } from "reactstrap";
import SingleLineFormGroup from "./SingleLineFormGroup";

import NumericalInput from './NumericalInput';

const NumericalInputWithUnit = ({ label, value, unitType, onChange, disabled, step, isMultiLine }) => {

  const inputRange = unitType?.inputRange || {}
  const stepSize = step ? step : inputRange.step

  const renderInput = () => {
    return (
      <NumericalInput
        precision={inputRange.precision}
        step={stepSize}
        value={value}
        initialStepValue={inputRange.initialStepValue}
        min={inputRange.min}
        max={inputRange.max}
        size={8}
        disabled={disabled}
        onChange={onChange}
        className='form-control'
        snap
      />
    )
  }

  return (
    isMultiLine ?
      <div className='numerical-input-with-unit'>
        <div className='numerical-input-with-unit__input'>
          {renderInput()}
        </div>
        <Label className='numerical-input-with-unit__unit'>
          {unitType?.label}
        </Label>
      </div> :
      <SingleLineFormGroup label={label}>
        <Row className='gx-1'>
          <Col md={5}>
            {renderInput()}
          </Col>
          <Label className='col-7 col-form-label'>
            {unitType?.label}
          </Label>
        </Row>
      </SingleLineFormGroup>
  )
}

export default NumericalInputWithUnit
