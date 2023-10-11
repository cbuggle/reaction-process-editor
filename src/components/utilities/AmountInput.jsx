import SingleLineFormGroup from "./SingleLineFormGroup";
import { Col, Row } from "reactstrap";
import NumericalInput from "./NumericalInput";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import AmountDecorator from "../../decorators/AmountDecorator";

const AmountInput = (
  {
    measurementType,
    maxAmount,
    share,
    currentAmount,
    currentUnit,
    onChangeAmountInput,
    activityType = 'action'
  }) => {

  const unitObjects = measurementType.units
  const maxUnit = measurementType.maxUnit
  const baseCSSClass = 'amount-input amount-input--' + activityType
  const isCurrentMeasurementType = currentUnit ? measurementType.type === AmountDecorator.unitMeasurementType(currentUnit).type : false
  const [localUnit, setLocalUnit] = useState(isCurrentMeasurementType ? currentUnit : maxUnit)
  const [localAmount, setLocalAmount] = useState(isCurrentMeasurementType ? currentAmount : share * maxAmount)


  useEffect(() => {
    let convertedAmount = maxAmount && share ? share * maxAmount : NaN
    setLocalUnit(isCurrentMeasurementType ? currentUnit : maxUnit)
    setLocalAmount(isCurrentMeasurementType ? currentAmount : convertedAmount)
    // eslint-disable-next-line
  }, [share, maxAmount, currentAmount, currentUnit])

  const handleChangeAmount = (value) => {
    // localShare only applies when there's a maxAmount to calculate it from. Else we want an empty input (NaN).
    const localShare = maxAmount && value ?
      value * AmountDecorator.unitScale(localUnit) / (maxAmount * AmountDecorator.unitScale(maxUnit))
      : NaN

    onChangeAmountInput({
      amount: value,
      unit: localUnit,
      share: localShare
    })
  }

  const handleChangeUnit = (newUnit) => {
    const newAmount = localAmount * AmountDecorator.unitScale(newUnit) / AmountDecorator.unitScale(localUnit)

    const localShare = (newAmount / AmountDecorator.unitScale(newUnit)) / (maxAmount / AmountDecorator.unitScale(maxUnit))

    onChangeAmountInput({
      amount: newAmount,
      unit: newUnit,
      share: localShare
    })
  }

  return (
    <div className={baseCSSClass + (isCurrentMeasurementType ? ' amount-input--active' : ' amount-input--passive')}>
      <SingleLineFormGroup label={measurementType.type}>
        <Row className={'gx-1'}>
          <Col md={5}>
            <NumericalInput
              value={localAmount}
              step={0.1}
              precision={3}
              min={0}
              max={maxAmount ? maxAmount : 10000000000000}
              size={8}
              onChange={handleChangeAmount}
              className='form-control'
              snap
            />
          </Col>
          <Col md={7}>
            <Select
              className="react-select--overwrite"
              classNamePrefix="react-select"
              name={"target_amount_unit_" + measurementType.type}
              options={unitObjects}
              value={unitObjects.find(item => item.value === localUnit)}
              onChange={selectedOption => handleChangeUnit(selectedOption.value)}
            />
          </Col>
        </Row>
      </SingleLineFormGroup>
    </div>
  )
}

export default AmountInput
