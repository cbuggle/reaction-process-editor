import React, { useState } from "react";

import AmountInput from "./AmountInput";
import NumericalInputWithUnit from "./NumericalInputWithUnit";

import AmountDecorator from "../../decorators/AmountDecorator";
import ConditionTypeDecorator from "../../decorators/ConditionTypeDecorator";

const AmountInputSet = (
  {
    amount,
    maxAmounts,
    unit,
    onChangeUnit,
    onChangeAmount
  }) => {

  const [share, setShare] = useState(1);
  const maxUnit = maxAmounts && unit && AmountDecorator.unitMeasurementType(unit)['maxUnit']

  const handlePercentageInput = (value) => {
    const newShare = value / 100
    const newAmount = newShare * (maxAmounts[maxUnit] / AmountDecorator.unitScale(maxUnit)) * AmountDecorator.unitScale(unit)

    let newUnit = unit

    if (!maxAmounts[maxUnit]) {
      // When want to switch to a unit with maxAmount when handling percentages. Those without are pointless.
      newUnit = maxAmounts['mg'] ? 'mg'
        : maxAmounts['ml'] ? 'ml'
          : maxAmounts['mmol'] ? 'mmol'
            : unit
    }
    handleChangeAmountInput(
      {
        amount: parseFloat(newAmount.toFixed(12)),
        unit: newUnit,
        share: newShare
      }
    )
  }

  const handleChangeAmountInput = (amountInputData) => {
    onChangeAmount(amountInputData.amount)
    onChangeUnit(amountInputData.unit)
    setShare(amountInputData.share)
  }

  return (
    <>
      {
        AmountDecorator.validMeasurementTypes.map((itemMeasurementType) => (
          <AmountInput
            measurementType={itemMeasurementType}
            maxAmount={maxAmounts && maxAmounts[itemMeasurementType.maxUnit]}
            share={share}
            currentAmount={amount}
            currentUnit={unit}
            key={itemMeasurementType.type}
            onChangeAmountInput={handleChangeAmountInput}
          />
        ))
      }
      {maxUnit && maxAmounts[maxUnit] &&
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('PERCENTAGE')}
          value={share * 100}
          unitType={ConditionTypeDecorator.defaultUnitType('PERCENTAGE')}
          onChange={handlePercentageInput}
        />
      }
    </>
  );
};

export default AmountInputSet;
