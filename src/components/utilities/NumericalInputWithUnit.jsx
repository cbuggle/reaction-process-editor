import React from 'react'

import NumericInput from 'react-numeric-input';
import { Label, Row, Col } from "reactstrap";
import ActionFormGroup from "../activities/forms/ActionFormGroup";

const NumericalInputWithUnit = ({ inputRanges, label, name, value, onWorkupChange, disabled }) => {

  const handleNumericInput = (value) => {
    onWorkupChange({ name: name, value: value })
  }

  return (
    <ActionFormGroup label={label}>
      <Row className='gx-1'>
        <Col md={5}>
          <NumericInput
            precision={inputRanges.precision}
            step={inputRanges.step}
            value={value}
            min={inputRanges.min}
            max={inputRanges.max}
            size={8}
            disabled={disabled}
            onChange={handleNumericInput}
            className='form-control'
            snap
          />
        </Col>
        <Label className='col-7 col-form-label'>
          {inputRanges.unit}
        </Label>
      </Row>
    </ActionFormGroup>
  )
}

export default NumericalInputWithUnit
