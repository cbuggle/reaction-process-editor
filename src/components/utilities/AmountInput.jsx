import React, { useEffect, useState } from "react";

import { allowedAmountOverscale, metrics, unitTypes } from "../../constants/metrics";
import MetricsInput from "./MetricsInput.jsx";

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

  const baseUnit = metrics[metricName].defaultUnit
  const isCurrentMetric = metrics[metricName].units.includes(currentAmount?.unit)

  const [localAmount, setLocalAmount] = useState()
  const [localMax, setLocalMax] = useState(allowedAmountOverscale * maxAmountInBaseUnit)

  useEffect(() => {
    let localUnit = localAmount?.unit || baseUnit
    let localUnitType = unitTypes[localUnit]
    let maxValue = localUnitType.fromBase(maxAmountInBaseUnit)

    if (isCurrentMetric) {
      // The current metric is always shown as is.
      setLocalAmount(currentAmount)
      maxAmountInBaseUnit && setLocalMax(maxValue * allowedAmountOverscale)
    } else if (maxAmountInBaseUnit) {
      // non-current metric calculates as fraction of maxAmountInBaseUnit
      setLocalAmount({ value: maxValue * currentFraction, unit: localUnit})
      setLocalMax(maxValue * allowedAmountOverscale)
    } else {
      // When there's no local maxAmount we want the non-current metric empty.
      setLocalAmount({ value: NaN, unit: localUnit })
      setLocalMax(localUnitType.max)
    }
  }, [baseUnit, localAmount?.unit, currentFraction, currentAmount, maxAmountInBaseUnit, isCurrentMetric])

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
