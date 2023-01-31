import React, { useEffect, useState, useMemo } from 'react'
import { ListGroupItem, Row, Col, Label, Input } from 'reactstrap'
import Select from 'react-select'

import NumericalnputWithUnit from '../../utilities/NumericalInputWithUnit';

import { conditionTendencyOptions, conditionUnitOptions, conditionValueRanges, conditionAdditionalInformationOptions } from '../../../constants/dropdownOptions/conditionsOptions';

const ConditionForm = ({ action, onWorkupChange }) => {

  const currentType = useMemo(() => { return action.workup['condition_type'] }, [action.workup['condition_type']])

  const currentAdditionalInformationOptions = useMemo(() => { return conditionAdditionalInformationOptions[currentType] }, [currentType])

  const currentSelectedAdditionalInformationOption = useMemo(() => {
    return currentAdditionalInformationOptions.find(option => option.value === action.workup['condition_additional_information']) || currentAdditionalInformationOptions[0]
  })

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
          <NumericalnputWithUnit
            name='temperature_value'
            label='Temperature'
            value={action.workup['temperature_value']}
            unit={conditionValueRanges['TEMPERATURE']['unit']}
            min={conditionValueRanges['TEMPERATURE']['min']}
            max={conditionValueRanges['TEMPERATURE']['max']}
            precision={conditionValueRanges['TEMPERATURE']['precision']}
            step={conditionValueRanges['TEMPERATURE']['step']}
            onWorkupChange={onWorkupChange} />
          <br />
          <NumericalnputWithUnit
            name='pressure_value'
            label='Pressure'
            value={action.workup['pressure_value']}
            unit={conditionValueRanges['PRESSURE']['unit']}
            min={conditionValueRanges['PRESSURE']['min']}
            max={conditionValueRanges['PRESSURE']['max']}
            precision={conditionValueRanges['PRESSURE']['precision']}
            step={conditionValueRanges['PRESSURE']['step']}
            onWorkupChange={onWorkupChange} />
          <br />
          <NumericalnputWithUnit
            name='ph_value'
            label='PH'
            value={action.workup['ph_value']}
            unit={conditionValueRanges['PH']['unit']}
            min={conditionValueRanges['PH']['min']}
            max={conditionValueRanges['PH']['max']}
            precision={conditionValueRanges['PH']['precision']}
            step={conditionValueRanges['PH']['step']}
            onWorkupChange={onWorkupChange} />
          <br />
          <NumericalnputWithUnit
            name='power_start_value'
            label='Power (Start)'
            value={action.workup['power_start_value']}
            unit={conditionValueRanges['POWER']['unit']}
            min={conditionValueRanges['POWER']['min']}
            max={conditionValueRanges['POWER']['max']}
            precision={conditionValueRanges['POWER']['precision']}
            step={conditionValueRanges['POWER']['step']}
            onWorkupChange={onWorkupChange} />
          <br />
          <Label check>
            <Input type="checkbox" checked={action.workup['power_is_ramp']} onChange={handleCheckbox} />
            Power Ramp
          </Label>
          {showPowerRampForm ?
            <>
              <br />
              <NumericalnputWithUnit
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
            {renderTendencySelect()}
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        Duration
        <NumericalnputWithUnit
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
