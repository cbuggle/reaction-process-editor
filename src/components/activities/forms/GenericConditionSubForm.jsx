import React, { useMemo, useState } from 'react';
import { Input, Label, FormGroup, Row, Col } from "reactstrap";
import NumericalInputWithUnit from "../../utilities/NumericalInputWithUnit";
import Select from "react-select";
import OptionalFormSet from "./OptionalFormSet"
  ;
import { conditionAdditionalInformationOptions } from "../../../constants/dropdownOptions/conditionsOptions";
import { conditionTypes } from '../../../constants/conditionTypes';

const GenericConditionSubForm = (
  {
    label,
    valueSummary,
    conditionTypeName,
    openSubFormLabel,
    children,
    findInitialValue,
    onSave,
    onToggleSubform
  }) => {
  const resetValue = () => {
    console.log("resetValue: " + conditionTypeName)
    return findInitialValue('value', defaultValue(conditionTypeName))
  }
  const resetPowerValue = () => {
    return findInitialValue('power_value', defaultValue('POWER'))
  }
  const resetPowerRamp = () => {
    return findInitialValue('power_is_ramp', false)
  }
  const resetPowerEndValue = () => {
    return findInitialValue('power_end_value', defaultValue('POWER'))
  }
  const resetAdditionalInformation = () => {
    return findInitialValue('additional_information', '')
  }
  const defaultValue = (typeName) => {
    return currentUnitType(typeName).inputRange.default
  }

  const currentUnitType = (typeName) => {
    // hardcoded defaultUnit  until we implement unit switching.
    const defaultUnit = conditionTypes[typeName].defaultUnit
    return conditionTypes[typeName].unitTypes[defaultUnit]
  }

  const [value, setValue] = useState(resetValue())
  const [powerValue, setPowerValue] = useState(resetPowerValue())
  const [powerRamp, setPowerRamp] = useState(resetPowerRamp())
  const [powerEndValue, setPowerEndValue] = useState(resetPowerEndValue())
  const [additionalInformation, setAdditionalInformation] = useState(resetAdditionalInformation())

  const currentAdditionalInformationOptions = useMemo(() => { return conditionAdditionalInformationOptions[conditionTypeName] }, [conditionTypeName])
  const currentSelectedAdditionalInformationOption = useMemo(
    () => { return currentAdditionalInformationOptions.find(option => option.value === additionalInformation) },
    [currentAdditionalInformationOptions, additionalInformation]
  )

  const resetFormData = () => {
    setValue(resetValue())
    setPowerValue(resetPowerValue())
    setPowerRamp(resetPowerRamp())
    setPowerEndValue(resetPowerEndValue())
    setAdditionalInformation(resetAdditionalInformation())
  }

  const renderPowerForm = () => {
    return (
      <>
        <NumericalInputWithUnit
          label='Power (Start)'
          value={powerValue}
          unitType={currentUnitType('POWER')}
          onWorkupChange={setPowerValue}
        />
        <FormGroup check>
          <Input
            type="checkbox"
            checked={!!powerRamp}
            onChange={event => setPowerRamp(event.target.checked)}
          />
          <Label check>Power Ramp</Label>
        </FormGroup>
        {!!powerRamp &&
          <NumericalInputWithUnit
            label='Power (End)'
            value={powerEndValue}
            unitType={currentUnitType('POWER')}
            onWorkupChange={setPowerEndValue}
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
    const condition = {
      value: value,
      power_value: powerValue,
      power_is_ramp: powerRamp,
      additional_information: additionalInformation
    }
    if (powerRamp) {
      condition.power_end_value = powerEndValue
    }
    onSave(condition)
  }

  const handleCancel = () => {
    resetFormData()
  }

  return (
    <OptionalFormSet
      groupLabel={label}
      valueSummary={valueSummary}
      openSubFormLabel={openSubFormLabel}
      onSave={handleSave}
      onCancel={handleCancel}
      onToggleSubform={onToggleSubform}
    >
      <Row className='gx-1 mb-3'>
        <Col md={6} className='generic-condition-sub-form__value'>
          <NumericalInputWithUnit
            name={conditionTypeName}
            value={value}
            unitType={currentUnitType(conditionTypeName)}
            onWorkupChange={setValue}
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
