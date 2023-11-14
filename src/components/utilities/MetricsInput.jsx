import React from "react";
import Select from "react-select";
import { Col, Label, Row } from "reactstrap";

import NumericalInput from "./NumericalInput";
import SingleLineFormGroup from "./SingleLineFormGroup";

import { metrics, unitTypes } from "../../constants/metrics";
import MetricsDecorator from "../../decorators/MetricsDecorator";

const MetricsInput = (
  {
    metricName,
    amount,
    max,
    onChange,
    displayMultiLine,
    disabled,
  }) => {

  const availableUnits = metrics[metricName].units
  const availableUnitOptions = availableUnits.map(unit => ({ value: unit, label: MetricsDecorator.unitLabel(unit) }))

  const showUnitAsLabel = availableUnitOptions.length < 2

  const localUnit = amount?.unit || MetricsDecorator.defaultUnit(metricName)

  const localUnitType = unitTypes[localUnit]
  const inputRange = localUnitType.inputRange || {}
  const localMax = max || max === 0 ? max : inputRange.max

  const handleChangeValue = (value) => onChange({ value: value, unit: localUnit })

  const handleChangeUnit = (oldUnit) => (newUnit) => {
    let oldUnitType = unitTypes[oldUnit]
    let newUnitType = unitTypes[newUnit]
    let newValue = newUnitType.fromBase(oldUnitType.toBase(amount?.value))

    onChange({ value: newValue, unit: newUnit })
  }

  const renderValueInput = () => {
    return (
      <NumericalInput
        value={amount?.value}
        precision={inputRange.precision}
        step={inputRange.step}
        initialStepValue={inputRange.initialStepValue}
        min={inputRange.min}
        max={localMax}
        size={8}
        disabled={disabled}
        onChange={handleChangeValue}
        className='form-control'
        snap
      />
    )
  }

  const renderUnitInput = () => {
    if (showUnitAsLabel) {
      return (
        <Label className='col-form-label px-1'>
          {localUnitType.label}
        </Label>
      )
    } else {
      return (
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name={"target_amount_unit_" + metrics[metricName].label}
          options={availableUnitOptions}
          value={availableUnitOptions.find(option => option.value === localUnit)}
          onChange={selectedOption => handleChangeUnit(localUnit)(selectedOption.value)}
        />
      )
    }
  }


  const renderInputs = () => {
    return (
      <Row className='gx-2'>
        <Col md={5}>
          {renderValueInput()}
        </Col >
        <Col md={7}>
          {renderUnitInput()}
        </Col>
      </Row >
    )
  }

  const renderSingleLine = () => {
    return (
      <SingleLineFormGroup label={metrics[metricName].label}>
        {renderInputs()}
      </SingleLineFormGroup >
    )
  }

  return (
    displayMultiLine ? renderInputs() : renderSingleLine()
  )
}

export default MetricsInput
