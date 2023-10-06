import React, {useState} from "react";
import ConditionTypeDecorator from "../../decorators/ConditionTypeDecorator";
import NumericalInputWithUnit from "./NumericalInputWithUnit";

import { substanceUnitOptions } from '../../constants/substanceUnitOptions';
import AmountInput from "./AmountInput";
import AmountDecorator from "../../decorators/AmountDecorator";

const AmountInputSet = (
  {
    amount,
    maxAmounts,
    unit,
    onChangeUnit,
    onChangeAmount
  }) => {

  const validMeasurementTypes = substanceUnitOptions.filter(item => item.type !== 'unspecified')
  const [share, setShare] = useState(1);

  const handlePercentageInput = (value) => {
    const newShare = value / 100
    const maxUnit = AmountDecorator.unitMeasurementType(unit)['maxUnit']
    const newAmount = newShare * (maxAmounts[maxUnit] / AmountDecorator.unitScale(maxUnit)) * AmountDecorator.unitScale(unit)
    handleChangeAmountInput(
      {
        amount: newAmount,
        unit: unit,
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
        validMeasurementTypes.map((itemMeasurementType) => (
          <AmountInput
            measurementType={itemMeasurementType}
            maxAmount={maxAmounts ? maxAmounts[itemMeasurementType.maxUnit] : undefined}
            share={share}
            currentAmount={amount}
            currentUnit={unit}
            key={itemMeasurementType.type}
            onChangeAmountInput={handleChangeAmountInput}
          />
        ))
      }
      <NumericalInputWithUnit
        label={ConditionTypeDecorator.label('PERCENTAGE')}
        value={share * 100}
        unitType={ConditionTypeDecorator.defaultUnitType('PERCENTAGE')}
        onChange={handlePercentageInput}
      />
    </>
  );
};

export default AmountInputSet;
