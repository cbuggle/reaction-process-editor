import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, Row } from "reactstrap";

import NumericalInput from "./NumericalInput";
import SingleLineFormGroup from "./SingleLineFormGroup";

import { allowedAmountOverscale, metrics, unitTypes } from "../../constants/metrics";

const AmountInput = (
  {
    metricName,
    maxAmountInBaseUnit,
    currentAmount,
    currentUnit,
    currentFraction,
    activityType = 'action',
    onChangeAmountInput,
    disabled = false
  }) => {
  const baseCSSClass = 'amount-input amount-input--' + activityType

  const baseUnit = metrics[metricName].defaultUnit
  const availableUnits = metrics[metricName].units
  const availableUnitOptions = availableUnits.map(unit => ({ value: unit, label: unitTypes[unit].label }))
  const isCurrentMetric = availableUnits.includes(currentUnit)

  const [localUnit, setLocalUnit] = useState(baseUnit)
  const [localAmount, setLocalAmount] = useState()
  const [localMax, setLocalMax] = useState()

  useEffect(() => {
    let localUnitType = unitTypes[localUnit]
    let currentUnitType = unitTypes[currentUnit]

    if (isCurrentMetric) {
      // The current metric is always shown as is.
      setLocalAmount(currentAmount)
      setLocalUnit(currentUnit)
      maxAmountInBaseUnit && setLocalMax(currentUnitType.fromBase(maxAmountInBaseUnit) * allowedAmountOverscale)
    } else if (localUnitType && maxAmountInBaseUnit) {
      // non-current metric calculates as fraction from maxAmountInBaseUnit
      // In TransferForm, only 1 of 3 metrics is set and currentFraction calculates to NaN => empty input as desired.
      setLocalAmount(currentFraction * localUnitType.fromBase(maxAmountInBaseUnit))
      setLocalMax(allowedAmountOverscale * localUnitType.fromBase(maxAmountInBaseUnit))
    } else {
      // When there's no local maxAmount we want all non-current metrics empty.
      setLocalAmount(NaN)
      setLocalMax(localUnitType?.max)
    }
  }, [currentFraction, currentAmount, currentUnit, localUnit, maxAmountInBaseUnit, isCurrentMetric])

  const inputRange = (unitName) => unitTypes[unitName]?.inputRange || {}

  const handleChangeAmount = (amount) => { onChangeAmountInput({ amount: amount, unit: localUnit }) }

  const handleChangeUnit = (oldUnit) => (newUnit) => {
    setLocalUnit(newUnit)
    onChangeAmountInput({ unit: newUnit, amount: unitTypes[newUnit].fromBase(unitTypes[oldUnit].toBase(localAmount)) })
  }

  return (
    <div className={baseCSSClass + (isCurrentMetric ? ' amount-input--active' : ' amount-input--passive')}>
      <SingleLineFormGroup label={metrics[metricName].label}>
        <Row className={'gx-1'}>
          <Col md={6}>
            <NumericalInput
              value={localAmount}
              precision={inputRange(localUnit).precision}
              step={inputRange(localUnit).step}
              initialStepValue={inputRange(localUnit).initialStepValue}
              min={inputRange(localUnit).min}
              max={localMax}
              size={8}
              disabled={disabled}
              onChange={handleChangeAmount}
              className='form-control'
              snap
            />
          </Col>
          <Col md={6}>
            <Select
              key={localUnit}
              className="react-select--overwrite"
              classNamePrefix="react-select"
              name={"target_amount_unit_" + metrics[metricName].label}
              options={availableUnitOptions}
              value={availableUnitOptions.find(unit => unit.value === localUnit)}
              onChange={selectedOption => handleChangeUnit(localUnit)(selectedOption.value)}
            />
          </Col>
        </Row>
      </SingleLineFormGroup>
    </div>
  )
}

export default AmountInput
