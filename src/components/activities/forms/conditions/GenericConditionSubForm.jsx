import React, { useContext, useState } from 'react';
import { Input, Label, FormGroup, Row, Col } from "reactstrap";
import Select from "react-select";

import ConditionTypeDecorator from '../../../../decorators/ConditionTypeDecorator';
import NumericalInputWithUnit from "../../../utilities/NumericalInputWithUnit";
import OptionalFormSet from "../OptionalFormSet";

import { SelectOptions } from '../../../views/Reaction';
import { MainHeaderSelectOptions } from '../../../layout/MainHeader';

const GenericConditionSubForm = (
  {
    conditionTypeName,
    valueSummary,
    openSubFormLabel,
    children,
    findInitialValue,
    onSave,
    onToggleSubform,
    isEqualToPredefinedValue = false,
    typeColor = 'condition'
  }) => {

  const headerSelectOptions = useContext(MainHeaderSelectOptions)
  const selectOptions = useContext(SelectOptions) || headerSelectOptions

  const additionalInformationOptions = selectOptions.condition_additional_information[conditionTypeName]
  const equipmentOptions = selectOptions.action_type_equipment['CONDITION'][conditionTypeName]

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

  const currentSelectedAdditionalInformationOption = additionalInformationOptions.find(option =>
    option.value === additionalInformation)

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
      additionalInformationOptions.length > 0 ?
        <>
          <Label>
            Additional Information
          </Label>
          <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
            name="additional_information"
            options={additionalInformationOptions}
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
      subFormLabel={ConditionTypeDecorator.label(conditionTypeName)}
      valueSummary={valueSummary}
      openSubFormLabel={openSubFormLabel}
      onSave={handleSave}
      onCancel={handleCancel}
      onToggleSubform={onToggleSubform}
      isEqualToPredefinedValue={isEqualToPredefinedValue}
      typeColor={typeColor}
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
      {equipmentOptions.length > 0 &&
        <FormGroup>
          {renderAdditionalInformationSelect()}
        </FormGroup>
      }
      {children}
    </OptionalFormSet>
  );
};

export default GenericConditionSubForm;
