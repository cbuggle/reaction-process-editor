import React from 'react'

import NumericInput from 'react-numeric-input';
import {Label, Row, Col, FormGroup, Input} from "reactstrap";
import ActionFormGroup from "../activities/forms/ActionFormGroup";
import Select from "react-select";
import {conditionTendencyOptions} from "../../constants/dropdownOptions/conditionsOptions";

const NumericalInputWithUnit = ({ inputRanges, label, name, value, onWorkupChange, disabled, hasTendencyOption=false, tendencyValue }) => {

  const handleNumericInput = (value) => {
    onWorkupChange({ name: name, value: value })
  }

  const renderNumericInput = () => {
    return (
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
    )
  }

  const renderTendencySelect = () => {
    return (
      <Select
        name="condition_tendency"
        options={ conditionTendencyOptions }
        value={ conditionTendencyOptions.find(option => option.value == tendencyValue) || conditionTendencyOptions[0]}
        onChange={selectedOption => onWorkupChange({ name: 'condition_tendency', value: selectedOption.value })}
      />
    )
  }

  return (
    hasTendencyOption ?
      <FormGroup>
        <Label>{label}</Label>
        <Row className='gx-1'>
          <Col md={4}>
            {renderNumericInput()}
          </Col>
          <Label className='col-2 col-form-label'>
            {inputRanges.unit}
          </Label>
          <Col md={6}>
            {renderTendencySelect()}
          </Col>
        </Row>
      </FormGroup>:
      <ActionFormGroup label={label}>
        <Row className='gx-1'>
          <Col md={5}>
            {renderNumericInput()}
          </Col>
          <Label className='col-7 col-form-label'>
            {inputRanges.unit}
          </Label>
        </Row>
      </ActionFormGroup>
  )
}

export default NumericalInputWithUnit
