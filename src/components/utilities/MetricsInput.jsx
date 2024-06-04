import React from "react";
import Select from "react-select";
import { Col, Label, Row } from "reactstrap";

import NumericalInput from "./NumericalInput";
import SingleLineFormGroup from "./SingleLineFormGroup";
import TooltipLabel from "./TooltipLabel";

import MetricsDecorator from "../../decorators/MetricsDecorator";
import OptionsDecorator from "../../decorators/OptionsDecorator";

const MetricsInput = (
  {
    metricName,
    label,
    tooltipName,
    amount,
    max,
    onChange,
    displayMultiLine,
    disabled,
  }) => {

  const availableUnitOptions = MetricsDecorator.units(metricName)
    .map(unit => ({ value: unit, label: MetricsDecorator.unitLabel(unit) }))

  const unitIsSelectable = availableUnitOptions.length > 1

  const localUnit = amount?.unit || MetricsDecorator.defaultUnit(metricName)
  const inputRange = MetricsDecorator.unitType(localUnit).inputRange || {}
  const localMax = max || max === 0 ? max : inputRange.max

  const handleChangeValue = (value) => onChange({ value: value, unit: localUnit })

  const handleChangeUnit = (oldUnit) => (newUnit) => {
    let newValue = MetricsDecorator.unitType(newUnit).fromBase(
      MetricsDecorator.unitType(oldUnit).toBase(amount?.value))

    onChange({ value: newValue, unit: newUnit })
  }

  const renderValueInput = () => {
    return (
      <NumericalInput
        value={amount?.value}
        precision={inputRange.precision}
        step={inputRange.step}
        initialStep={inputRange.initialStep}
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
    if (unitIsSelectable) {
      return (
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name={"target_amount_unit_" + MetricsDecorator.label(metricName)}
          options={availableUnitOptions}
          value={OptionsDecorator.optionForKey(localUnit, availableUnitOptions)}
          onChange={selectedOption => handleChangeUnit(localUnit)(selectedOption.value)}
        />
      )
    } else {
      return (
        <Label className='col-form-label px-1'>
          {MetricsDecorator.unitLabel(localUnit)}
        </Label>
      )
    }
  }

  const renderLabel = () => {
    return tooltipName ?
      <TooltipLabel name={tooltipName} label={label || MetricsDecorator.label(metricName)} />
      : label || MetricsDecorator.label(metricName)
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
      <SingleLineFormGroup
        label={renderLabel()}>
        {renderInputs()}
      </SingleLineFormGroup >
    )
  }

  return (
    displayMultiLine ? renderInputs() : renderSingleLine()
  )
}

export default MetricsInput
