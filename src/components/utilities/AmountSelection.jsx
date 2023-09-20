import { Row, Col } from "reactstrap";
import { sampleVolumeUnitOptions } from '../../constants/dropdownOptions/samplesOptions';
import React from "react";
import Select from "react-select";
import NumericalInputWithUnit from "./NumericalInputWithUnit";
import SingleLineFormGroup from "./SingleLineFormGroup";
import NumericInput from "react-numeric-input";

import { conditionTypes } from "../../constants/conditionTypes";

const AmountSelection = ({ amount, maxAmount, unit, disableUnitSelection, onChangeUnit, onChangeAmount }) => {

  // Hardcoded default until we implement unit switching
  const defaultPercentageUnit = conditionTypes['PERCENTAGE'].defaultUnit
  const percentageUnitType = conditionTypes['PERCENTAGE'].unitTypes[defaultPercentageUnit]

  const handlePercentageInput = ({ value }) => {
    let newAmount = value * maxAmount / 100
    if (value < 100) {
      newAmount = newAmount.toFixed(5)
    }
    onChangeAmount(newAmount)
  }

  const calcPercentage = () => {
    return (amount / maxAmount * 100).toFixed(5)
  }

  return (
    <>
      <SingleLineFormGroup label='Amount'>
        <Row className='gx-1'>
          <Col md={5}>
            <NumericInput
              value={amount || 0}
              step={0.1}
              precision = {1}
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
              onChange={onChangeUnit}
            />
          </Col>
        </Row>
      </SingleLineFormGroup>
      {maxAmount &&
        <NumericalInputWithUnit
          label={percentageUnitType.label}
          name='percentage'
          value={calcPercentage()}
          unitType={percentageUnitType}
          onWorkupChange={handlePercentageInput}
        />
      }
    </>
  );
};

export default AmountSelection;
