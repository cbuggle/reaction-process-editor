import React from "react";

import AmountInput from "./AmountInput";
import NumericalInputWithUnit from "./NumericalInputWithUnit";

import ConditionTypeDecorator from "../../decorators/ConditionTypeDecorator";

import { amountInputMetricNames, conditionTypes, unitTypes } from "../../constants/conditionTypes";

const AmountInputSet = (
  {
    amount,
    unit,
    maxAmounts,
    onChangeAmount
  }) => {

  const currentConditionType = Object.values(conditionTypes).find(conditionType => conditionType.units.includes(unit))
  const currentBaseUnit = currentConditionType?.defaultUnit || conditionTypes['WEIGHT'].defaultUnit
  const currentFraction = maxAmounts?.[currentBaseUnit] ?
    unitTypes[unit]?.toBase(amount) / maxAmounts[currentBaseUnit]
    : NaN

  const maxAmountInBaseUnit = (metricName) => maxAmounts?.[conditionTypes[metricName].defaultUnit]

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
            onChangeAmountInput={handleChangeAmountInput(conditionTypes[metricName].defaultUnit)}
          />
        ))
      }
      {maxAmounts?.[currentBaseUnit] > 0 &&
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('PERCENTAGE')}
          value={currentFraction * 100}
          unitType={ConditionTypeDecorator.defaultUnitType('PERCENTAGE')}
          onChange={handlePercentageInput}
        />
      }
    </>
  );
};

export default AmountInputSet;
