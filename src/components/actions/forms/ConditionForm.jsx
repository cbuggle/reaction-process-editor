import React, { useEffect, useState, useMemo } from 'react'
import { ListGroupItem, Row, Col, Label, Input } from 'reactstrap'
import Select from 'react-select'

import { conditionTendencyOptions, conditionTypeOptions, conditionUnitOptions, conditionValueRanges, conditionAdditionalInformationOptions } from '../../../constants/dropdownOptions/conditionsOptions';
import TemperatureInput from '../../utilities/TemperatureInput';

const ConditionForm = ({ action, onWorkupChange }) => {

  const currentType = useMemo(() => { return action.workup['condition_type'] }, [action.workup['condition_type']])

  const currentUnitOptions = useMemo(() => { return conditionUnitOptions[currentType] }, [currentType])
  const currentAdditionalInformationOptions = useMemo(() => { return conditionAdditionalInformationOptions[currentType] }, [currentType])

  const currentSelectedUnitOption = useMemo(() => {
    return currentUnitOptions.find(option => option.value === action.workup['condition_unit']) || currentUnitOptions[0]
  })

  const currentSelectedAdditionalInformationOption = useMemo(() => {
    return currentAdditionalInformationOptions.find(option => option.value === action.workup['condition_additional_information']) || currentAdditionalInformationOptions[0]
  })

  const currentRangeMin = useMemo(() => { return conditionValueRanges[currentType]['min'] }, [currentType])
  const currentRangePrecision = useMemo(() => { return conditionValueRanges[currentType]['precision'] }, [currentType])
  const currentRangeStep = useMemo(() => { return conditionValueRanges[currentType]['step'] }, [currentType])
  const currentRangeMax = useMemo(() => { return conditionValueRanges[currentType]['max'] }, [currentType])

  const handleTypeChange = (value) => {
    onWorkupChange({ name: 'condition_type', value: value })
    onWorkupChange({ name: 'condition_unit', value: conditionValueRanges[value]['unit'] })
    onWorkupChange({ name: 'condition_value', value: conditionValueRanges[value]['default'] })
    onWorkupChange({ name: 'condition_additional_information', value: "" })
    onWorkupChange({ name: 'condition_tendency', value: "" })
  }

  useEffect(() => {
    if (action.workup['condition_value'] == undefined) {
      onWorkupChange({ name: 'condition_value', value: conditionValueRanges[currentType]['default'] })
    } else {
      onWorkupChange({ name: 'condition_value', value: action.workup['condition_value'] })
    }
    onWorkupChange({ name: 'condition_unit', value: conditionValueRanges[currentType]['unit'] })
  }, [])


  const [showPowerRampForm, setShowPowerRampForm] = useState(action.workup['power_is_ramp'])

  const handleCheckbox = (event) => {
    setShowPowerRampForm(event.target.checked)
    onWorkupChange({ name: 'power_is_ramp', value: event.target.checked })

    if (!event.target.checked) {
      onWorkupChange({ name: 'power_end_value', value: "" })

    }
  }


  const renderTendencySelect = () => {
    if (currentType === 'IRRADIATION') {
      return (<></>)
    } else {
      return (
        <Select
          name="condition_tendency"
          options={conditionTendencyOptions}
          value={conditionTendencyOptions.find(option => option.value == action.workup['condition_tendency']) || conditionTendencyOptions[0]}
          onChange={selectedOption => onWorkupChange({ name: 'condition_tendency', value: selectedOption.value })}
        />
      )
    }
  }

  const renderAdditionalInformationSelect = () => {
    if (currentAdditionalInformationOptions.length > 0) {
      return (
        <>
          <Label>
            Additional Information
          </Label>
          < Select
            name="condition_additional_information"
            options={currentAdditionalInformationOptions}
            value={currentSelectedAdditionalInformationOption}
            onChange={selectedOption => onWorkupChange({ name: 'condition_additional_information', value: selectedOption.value })}
          />
        </>
      )
    } else {
      return (<></>)
    }
  }

  const renderMicrowaveForm = () => {
    return (
      <>
        <ListGroupItem>
          <TemperatureInput
            name='temperature_value'
            label='Temperature'
            value={action.workup['temperature_value'] || conditionValueRanges['TEMPERATURE']['default']}
            unit={conditionValueRanges['TEMPERATURE']['unit']}
            min={conditionValueRanges['TEMPERATURE']['min']}
            max={conditionValueRanges['TEMPERATURE']['max']}
            precision={conditionValueRanges['TEMPERATURE']['precision']}
            step={conditionValueRanges['TEMPERATURE']['step']}
            onWorkupChange={onWorkupChange} />
          <br />
          <TemperatureInput
            name='pressure_value'
            label='Pressure'
            value={action.workup['pressure_value'] || conditionValueRanges['PRESSURE']['default']}
            unit={conditionValueRanges['PRESSURE']['unit']}
            min={conditionValueRanges['PRESSURE']['min']}
            max={conditionValueRanges['PRESSURE']['max']}
            precision={conditionValueRanges['PRESSURE']['precision']}
            step={conditionValueRanges['PRESSURE']['step']}
            onWorkupChange={onWorkupChange} />
          <br />
          <Label check>
            <Input type="checkbox" checked={action.workup['power_is_ramp']} onChange={handleCheckbox} />
            Power Ramp
          </Label>
          <br />
          <TemperatureInput
            name='power_start_value'
            label='Power (Start)'
            value={action.workup['power_start_value'] || conditionValueRanges['POWER']['default']}
            unit={conditionValueRanges['POWER']['unit']}
            min={conditionValueRanges['POWER']['min']}
            max={conditionValueRanges['POWER']['max']}
            precision={conditionValueRanges['POWER']['precision']}
            step={conditionValueRanges['POWER']['step']}
            onWorkupChange={onWorkupChange} />
          {showPowerRampForm ?
            <>
              <br />
              <TemperatureInput
                name='power_end_value'
                label='Power (End)'
                value={action.workup['power_end_value'] || conditionValueRanges['POWER']['default']}
                unit={conditionValueRanges['POWER']['unit']}
                min={conditionValueRanges['POWER']['min']}
                max={conditionValueRanges['POWER']['max']}
                precision={conditionValueRanges['POWER']['precision']}
                step={conditionValueRanges['POWER']['step']}
                onWorkupChange={onWorkupChange} /></> : <></>

          }
        </ListGroupItem>
      </>
    )
  }

  return (
    <div className="motion-form">
      <ListGroupItem>
        <Row>
          <Col md={6}>
            <Select
              name="condition_type"
              options={conditionTypeOptions}
              value={conditionTypeOptions.find(option => option.value === action.workup['condition_type'])}
              onChange={selectedOption => handleTypeChange(selectedOption.value)}
            />
          </Col>
          <Col md={6}>
            {renderTendencySelect()}
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <TemperatureInput
          name='condition_value'
          unit={currentSelectedUnitOption.label}
          precision={currentRangePrecision}
          step={currentRangeStep}
          value={action.workup['condition_value']}
          min={currentRangeMin}
          max={currentRangeMax}
          onWorkupChange={onWorkupChange} />
      </ListGroupItem>
      <ListGroupItem>
        Duration
        <TemperatureInput
          name='duration_in_minutes'
          unit={'Minutes'}
          precision={0}
          step={1}
          value={action.workup['duration_in_minutes'] || 0}
          min={0}
          max={1440}
          onWorkupChange={onWorkupChange} />
      </ListGroupItem>
      {renderMicrowaveForm()}
      <ListGroupItem>
        <Row>
          <Col>
            {renderAdditionalInformationSelect()}
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  )
}

export default ConditionForm
