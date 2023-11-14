import React, { useEffect, useState } from "react";

import MetricsInput from "./MetricsInput.jsx";

import MetricsDecorator from "../../decorators/MetricsDecorator.jsx";

const AmountInput = (
  {
    metricName,
    maxAmountInBaseUnit,
    currentAmount,
    currentFraction,
    activityType = 'action',
    onChange,
    disabled
  }) => {
  const baseCSSClass = 'amount-input amount-input--' + activityType

  const isCurrentMetric = MetricsDecorator.units(metricName).includes(currentAmount?.unit)

  const [localAmount, setLocalAmount] = useState()
  const [localMax, setLocalMax] = useState(MetricsDecorator.overscaledAmount(maxAmountInBaseUnit))

  useEffect(() => {
    let localUnit = localAmount?.unit || MetricsDecorator.defaultUnit(metricName)
    let localUnitType = MetricsDecorator.unitType(localUnit)
    let localMaxValue = localUnitType.fromBase(maxAmountInBaseUnit)

    if (isCurrentMetric) {
      // The current metric is always shown as is.
      setLocalAmount(currentAmount)
      maxAmountInBaseUnit && setLocalMax(MetricsDecorator.overscaledAmount(localMaxValue))
    } else if (maxAmountInBaseUnit) {
      // non-current metric calculates as fraction of maxAmountInBaseUnit
      setLocalAmount({ value: localMaxValue * currentFraction, unit: localUnit })
      setLocalMax(MetricsDecorator.overscaledAmount(localMaxValue))
    } else {
      // When there's no local maxAmount we want the non-current metric empty.
      setLocalAmount({ value: NaN, unit: localUnit })
      setLocalMax(localUnitType.max)
    }
  }, [metricName, currentFraction, currentAmount, maxAmountInBaseUnit, localAmount?.unit, isCurrentMetric])

  return (
    <div className={baseCSSClass + (isCurrentMetric ? ' amount-input--active' : ' amount-input--passive')}>
      <MetricsInput
        metricName={metricName}
        amount={localAmount}
        max={localMax}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default AmountInput
