import React, {useMemo, useState} from 'react';
import {Input, Label, FormGroup, Row, Col} from "reactstrap";
import NumericalInputWithUnit from "../../utilities/NumericalInputWithUnit";
import {
  conditionAdditionalInformationOptions,
  conditionInputRanges,
  conditionTendencyOptions
} from "../../../constants/dropdownOptions/conditionsOptions";
import Select from "react-select";
import FormButtons from "../../utilities/FormButtons";

const GenericConditionSubForm = ({label, typeName, children, findInitialValue, onSave, onCancel}) => {
  const resetValue = () => {
    return findInitialValue('value', conditionInputRanges[typeName].default)
  }
  const resetConditionTendency = () => {
    return findInitialValue('condition_tendency', conditionTendencyOptions[0].value)
  }
  const resetPowerValue = () => {
    return findInitialValue('power_value', conditionInputRanges['POWER'].default)
  }
  const resetPowerRamp = () => {
    return findInitialValue('power_is_ramp', false)
  }
  const resetPowerEndValue = () => {
    return findInitialValue('power_end_value', conditionInputRanges['POWER'].default)
  }
  const resetAdditionalInformation = () => {
    return findInitialValue('additional_information', '')
  }
  const [value, setValue] = useState(resetValue())
  const [conditionTendency, setConditionTendency] = useState(resetConditionTendency())
  const [powerValue, setPowerValue] = useState(resetPowerValue())
  const [powerRamp, setPowerRamp] = useState(resetPowerRamp())
  const [powerEndValue, setPowerEndValue] = useState(resetPowerEndValue())
  const [additionalInformation, setAdditionalInformation] = useState(resetAdditionalInformation())

  const currentAdditionalInformationOptions = useMemo(() => { return conditionAdditionalInformationOptions[typeName] }, [typeName])
  const powerInputRange = conditionInputRanges['POWER']
  const currentSelectedAdditionalInformationOption = useMemo(
    () => {return currentAdditionalInformationOptions.find(option => option.value === additionalInformation)},
    [currentAdditionalInformationOptions, additionalInformation]
  )

  const resetFormData = () => {
    setValue(resetValue())
    setConditionTendency(resetConditionTendency())
    setPowerValue(resetPowerValue())
    setPowerRamp(resetPowerRamp())
    setPowerEndValue(resetPowerEndValue())
    setAdditionalInformation(resetAdditionalInformation())
  }

  const renderPowerForm = () => {
    return (
      <FormGroup>
        <NumericalInputWithUnit
          label='Power (Start)'
          value={powerValue}
          inputRanges={powerInputRange}
          onWorkupChange={setPowerValue}
        />
        <FormGroup check className='mb-3'>
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
            inputRanges={powerInputRange}
            onWorkupChange={setPowerEndValue}
          />
        }
      </FormGroup>
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
        </>:
      <></>
    )
  }

  const handleSave = () => {
    const condition = {
      value: value,
      condition_tendency: conditionTendency,
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
    onCancel()
  }

  return (
    <>
      <FormGroup>
        <Label>{label}</Label>
        <Row className='gx-1'>
          <Col md={6} className='generic-condition-sub-form__value'>
            <NumericalInputWithUnit
              value={value}
              inputRanges={conditionInputRanges[typeName]}
              onWorkupChange={setValue}
            />
          </Col>
          <Col md={6}>
            <Select
            className="react-select--overwrite"
            classNamePrefix="react-select"
              name="condition_tendency"
              options={ conditionTendencyOptions }
              value={ conditionTendencyOptions.find(option => option.value === conditionTendency)}
              onChange={selectedOption => setConditionTendency(selectedOption.value)}
            />
          </Col>
        </Row>
      </FormGroup>
      {typeName === 'IRRADIATION' &&
        <FormGroup>
          {renderPowerForm()}
        </FormGroup>
      }
      {currentAdditionalInformationOptions.length > 0 &&
        <FormGroup>
          {renderAdditionalInformationSelect()}
        </FormGroup>
      }
      { children }
      <FormButtons
        type='condition'
        onSave={handleSave}
        onCancel={handleCancel}
        saveLabel='Set'
      />
    </>
  );
};

export default GenericConditionSubForm;
