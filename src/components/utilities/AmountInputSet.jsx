import React from "react";

import AmountInput from "./AmountInput";
import MetricsInput from "./MetricsInput";

import { allowedAmountOverscale, amountInputSetMetricNames, metrics, unitTypes } from "../../constants/metrics";

const AmountInputSet = (
  {
    amount,
    maxAmounts,
    onChangeAmount
  }) => {

  const currentMetric = Object.values(metrics).find(metric => metric.units.includes(amount?.unit))
  const currentBaseUnit = currentMetric?.defaultUnit || metrics['WEIGHT'].defaultUnit

  const currentFraction = amount && maxAmounts?.[currentBaseUnit] ?
    unitTypes[amount.unit].toBase(amount.value) / maxAmounts[currentBaseUnit]
    : NaN

  const maxAmountInBaseUnit = (metricName) => maxAmounts?.[metrics[metricName].defaultUnit]

  const handlePercentageInput = (percentage) => {
    const newAmount = unitTypes[amount.unit].fromBase(maxAmounts[currentBaseUnit]) * percentage.value / 100
    onChangeAmount({ value: newAmount, unit: amount.unit, percentage: percentage.value })
  }

  const handleChangeAmountInput = (baseUnit) => (amount) => {
    const fraction = maxAmounts?.[baseUnit] ? unitTypes[amount.unit].toBase(amount.value) / maxAmounts[baseUnit] : 1
    onChangeAmount({ value: amount.value, unit: amount.unit, percentage: 100 * fraction })
  }

  return (
    <>
      {
        amountInputSetMetricNames.map((metricName) => (
          <AmountInput
            key={metricName}
            metricName={metricName}
            currentAmount={amount}
            currentFraction={currentFraction}
            maxAmountInBaseUnit={maxAmountInBaseUnit(metricName)}
            onChange={handleChangeAmountInput(metrics[metricName].defaultUnit)}
          />
        ))
      }
      {maxAmounts?.[currentBaseUnit] > 0 &&
        <MetricsInput
          metricName={'PERCENTAGE'}
          amount={{ value: 100 * currentFraction, unit: 'PERCENT' }}
          max={100 * allowedAmountOverscale}
          onChange={handlePercentageInput}
        />
      }
    </>
  );
};

export default AmountInputSet;
