import React, { useMemo, useState } from 'react';
import { Input, Label, FormGroup, Row, Col } from "reactstrap";
import Select from "react-select";

import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';
import NumericalInputWithUnit from "../../utilities/NumericalInputWithUnit";
import OptionalFormSet from "./OptionalFormSet";

import { conditionAdditionalInformationOptions } from "../../../constants/dropdownOptions/conditionsOptions";


const GenericConditionSubForm = (
  {
    conditionTypeName,
    valueSummary,
    openSubFormLabel,
    children,
    findInitialValue,
    onSave,
    onToggleSubform
  }) => {
  const initialValue = () => {
    return findInitialValue('value', ConditionTypeDecorator.defaultValueInDefaultUnit(conditionTypeName))
  }
  const initialUnit = () => {
    return findInitialValue('unit', ConditionTypeDecorator.defaultUnit(conditionTypeName))
  }
  const initialPowerValue = () => {
    return findInitialValue('power_value', ConditionTypeDecorator.defaultValueInDefaultUnit('POWER'))
  }
  const initialPowerRamp = () => {
    return findInitialValue('power_is_ramp', false)
  }
  const initialPowerEndValue = () => {
    return findInitialValue('power_end_value', ConditionTypeDecorator.defaultValueInDefaultUnit('POWER'))
  }
  const initialAdditionalInformation = () => {
    return findInitialValue('additional_information', '')
  }

  const [value, setValue] = useState(initialValue())
  const [unit, setUnit] = useState(initialUnit())
  const [powerValue, setPowerValue] = useState(initialPowerValue())
  const [powerRamp, setPowerRamp] = useState(initialPowerRamp())
  const [powerEndValue, setPowerEndValue] = useState(initialPowerEndValue())
  const [additionalInformation, setAdditionalInformation] = useState(initialAdditionalInformation())

  const currentAdditionalInformationOptions = useMemo(() => { return conditionAdditionalInformationOptions[conditionTypeName] }, [conditionTypeName])
  const currentSelectedAdditionalInformationOption = useMemo(
    () => { return currentAdditionalInformationOptions.find(option => option.value === additionalInformation) },
    [currentAdditionalInformationOptions, additionalInformation]
  )

  const resetFormData = () => {
    setValue(initialValue())
    setUnit(initialUnit())
    setPowerValue(initialPowerValue())
    setPowerRamp(initialPowerRamp())
    setPowerEndValue(initialPowerEndValue())
    setAdditionalInformation(initialAdditionalInformation())
  }

  const renderPowerForm = () => {
    return (
      <>
        <FormGroup check>
          <Input
            type="checkbox"
            checked={!!powerRamp}
            onChange={event => setPowerRamp(event.target.checked)}
          />
          <Label check>{ConditionTypeDecorator.label('POWER_RAMP')}</Label>
          </FormGroup>
        <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('POWER_START')}
          value={powerValue}
          unitType={ConditionTypeDecorator.defaultUnitType('POWER')}
          onChange={setPowerValue}
          />
        {!!powerRamp &&
          <NumericalInputWithUnit
          label={ConditionTypeDecorator.label('POWER_END')}
          value={powerEndValue}
            unitType={ConditionTypeDecorator.defaultUnitType('POWER')}
            onChange={setPowerEndValue}
            />
          }
      </>
    )
  }

  const renderAdditionalInformationSelect = () => {
    return (
      currentAdditionalInformationOptions.length > 0 ?
        <>
          <Label>
            Additional Information
          </Label>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="additional_information"
            options={currentAdditionalInformationOptions}
            value={currentSelectedAdditionalInformationOption}
            onChange={selectedOption => setAdditionalInformation(selectedOption.value)}
          />
        </> :
        <></>
    )
  }

  const handleSave = () => {
    let condition = {
      value: value,
      unit: unit,
      additional_information: additionalInformation
    };

    if (conditionTypeName === 'IRRADIATION') {
      condition.power_value = powerValue
      condition.power_is_ramp = powerRamp
      if (powerRamp) {
        condition.power_end_value = powerEndValue
      }
    }
    onSave(condition)
  }

  const handleCancel = () => {
    resetFormData()
  }

  return (
    <OptionalFormSet
      groupLabel={ConditionTypeDecorator.label(conditionTypeName)}
      valueSummary={valueSummary}
      openSubFormLabel={openSubFormLabel}
      onSave={handleSave}
      onCancel={handleCancel}
      onToggleSubform={onToggleSubform}
    >
      <Row className='gx-1 mb-3'>
        <Col md={6} className='generic-condition-sub-form__value'>
          <NumericalInputWithUnit
            value={value}
            unitType={ConditionTypeDecorator.defaultUnitType(conditionTypeName)}
            onChange={setValue}
            isMultiLine={true}
          />
        </Col>
      </Row>
      {conditionTypeName === 'IRRADIATION' &&
        <FormGroup>
          {renderPowerForm()}
        </FormGroup>
      }
      {currentAdditionalInformationOptions.length > 0 &&
        <FormGroup>
          {renderAdditionalInformationSelect()}
        </FormGroup>
      }
      {children}
    </OptionalFormSet>
  );
};

export default GenericConditionSubForm;
