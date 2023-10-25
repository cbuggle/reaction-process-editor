import React from "react";

import AmountInput from "./AmountInput";
import NumericalInputWithUnit from "./NumericalInputWithUnit";

import MetricsDecorator from "../../decorators/MetricsDecorator";

import { amountInputMetricNames, metrics, unitTypes } from "../../constants/metrics";

const AmountInputSet = (
  {
    amount,
    unit,
    maxAmounts,
    onChangeAmount
  }) => {

  const currentMetric = Object.values(metrics).find(metric => metric.units.includes(unit))
  const currentBaseUnit = currentMetric?.defaultUnit || metrics['WEIGHT'].defaultUnit
  const currentFraction = maxAmounts?.[currentBaseUnit] ?
    unitTypes[unit]?.toBase(amount) / maxAmounts[currentBaseUnit]
    : NaN

  const maxAmountInBaseUnit = (metricName) => maxAmounts?.[metrics[metricName].defaultUnit]

  const handlePercentageInput = (percentage) => {
    const newAmount = unitTypes[unit].fromBase(maxAmounts[currentBaseUnit]) * percentage / 100
    onChangeAmount({ value: newAmount, unit: unit, percentage: percentage })
  }

  const handleChangeAmountInput = (baseUnit) => ({ amount, unit }) => {
    const fraction = maxAmounts?.[baseUnit] ? unitTypes[unit].toBase(amount) / maxAmounts[baseUnit] : 1
    onChangeAmount({ value: amount, unit: unit, percentage: 100 * fraction })
  }

  return (
    <>
      {
        amountInputMetricNames.map((metricName) => (
          <AmountInput
            key={metricName}
            metricName={metricName}
            maxAmountInBaseUnit={maxAmountInBaseUnit(metricName)}
            currentAmount={amount}
            currentUnit={unit}
            currentFraction={currentFraction}
            onChangeAmountInput={handleChangeAmountInput(metrics[metricName].defaultUnit)}
          />
        ))
      }
      {maxAmounts?.[currentBaseUnit] > 0 &&
        <NumericalInputWithUnit
          label={MetricsDecorator.label('PERCENTAGE')}
          value={currentFraction * 100}
          unitType={MetricsDecorator.defaultUnitType('PERCENTAGE')}
          onChange={handlePercentageInput}
        />
      }
    </>
  );
};

export default AmountInputSet;
