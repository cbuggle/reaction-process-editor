import { Row, Col } from "reactstrap";
import React from "react";
import Select from "react-select";

import ConditionTypeDecorator from "../../decorators/ConditionTypeDecorator";
import NumericalInput from "./NumericalInput";
import NumericalInputWithUnit from "./NumericalInputWithUnit";
import SingleLineFormGroup from "./SingleLineFormGroup";

import { sampleVolumeUnitOptions } from '../../constants/dropdownOptions/samplesOptions';

const AmountSelection = ({ amount, maxAmount, unit, disableUnitSelection, onChangeUnit, onChangeAmount }) => {

  const handlePercentageInput = (value) => {
    let newAmount = value * maxAmount / 100
    if (value < 100) {
      newAmount = newAmount.toFixed(5)
    }
    onChangeAmount(newAmount)
  }

  const calcPercentage = () => {
    return ((amount * 100) / maxAmount).toFixed(5)
  }

  return (
    // Having the inputRanges hard coded for now as the input will be rewritten for multi-units soon anyway.
    <>
      <SingleLineFormGroup label='Amount'>
        <Row className='gx-1'>
          <Col md={5}>
            <NumericalInput
              value={amount || 0}
              step={0.1}
              precision={3}
              min={0}
              max={maxAmount || 10000000000000}
              size={8}
              onChange={onChangeAmount}
              className='form-control'
              snap
            />
          </Col>
          <Col md={7}>
            <Select
              isDisabled={disableUnitSelection}
              className="react-select--overwrite"
              classNamePrefix="react-select"
              name="target_amount_unit"
              options={sampleVolumeUnitOptions}
              value={sampleVolumeUnitOptions.find(item => item.value === unit)}
              onChange={selected => onChangeUnit(selected.value)}
            />
          </Col>
        </Row>
      </SingleLineFormGroup>
      {maxAmount &&
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('PERCENTAGE')}
          value={calcPercentage()}
          unitType={ConditionTypeDecorator.defaultUnitType('PERCENTAGE')}
          onChange={handlePercentageInput}
        />
      }
    </>
  );
};

export default AmountSelection;
