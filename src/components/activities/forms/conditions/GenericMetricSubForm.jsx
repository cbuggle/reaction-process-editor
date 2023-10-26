import React, { useContext, useState } from 'react';
import { Input, Label, FormGroup, Row, Col } from "reactstrap";
import Select from "react-select";

import MetricsDecorator from '../../../../decorators/MetricsDecorator';
import NumericalInputWithUnit from "../../../utilities/NumericalInputWithUnit";
import OptionalFormSet from "../OptionalFormSet";

import { SelectOptions } from '../../../views/Reaction';
import { MainHeaderSelectOptions } from '../../../layout/MainHeader';

const GenericMetricSubForm = (
  {
    metricName,
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

  const additionalInformationOptions = selectOptions.condition_additional_information[metricName]

  const initialValue = () => {
    return findInitialValue('value', MetricsDecorator.defaultValueInDefaultUnit(metricName))
  }
  const initialUnit = () => {
    return findInitialValue('unit', MetricsDecorator.defaultUnit(metricName))
  }
  const initialPowerValue = () => {
    return findInitialValue('power_value', MetricsDecorator.defaultValueInDefaultUnit('POWER'))
  }
  const initialPowerRamp = () => {
    return findInitialValue('power_is_ramp', false)
  }
  const initialPowerEndValue = () => {
    return findInitialValue('power_end_value', MetricsDecorator.defaultValueInDefaultUnit('POWER'))
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
          <Label check>{'Power Ramp'}</Label>
        </FormGroup>
        <NumericalInputWithUnit
          label={MetricsDecorator.label('POWER_START')}
          value={powerValue}
          unitType={MetricsDecorator.defaultUnitType('POWER')}
          onChange={setPowerValue}
        />
        {!!powerRamp &&
          <NumericalInputWithUnit
            label={MetricsDecorator.label('POWER_END')}
            value={powerEndValue}
            unitType={MetricsDecorator.defaultUnitType('POWER')}
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
    let condition = { value: value, unit: unit, additional_information: additionalInformation };

    if (metricName === 'IRRADIATION') {
      condition.power_value = powerValue
      if (powerRamp) {
        condition.power_is_ramp = powerRamp
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
      subFormLabel={MetricsDecorator.label(metricName)}
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
            unitType={MetricsDecorator.defaultUnitType(metricName)}
            onChange={setValue}
            isMultiLine={true}
          />
        </Col>
      </Row>
      {metricName === 'IRRADIATION' &&
        <FormGroup>
          {renderPowerForm()}
        </FormGroup>
      }
      <FormGroup>
        {renderAdditionalInformationSelect()}
      </FormGroup>
      {children}
    </OptionalFormSet>
  );
};

export default GenericMetricSubForm;
