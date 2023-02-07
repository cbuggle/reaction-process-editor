import React, { useMemo } from 'react'
import { ListGroupItem, Row, Col, Label, Input } from 'reactstrap'
import Select from 'react-select'

import NumericalnputWithUnit from '../../utilities/NumericalInputWithUnit';

import { conditionInputRanges, conditionTendencyOptions, conditionAdditionalInformationOptions } from '../../../constants/dropdownOptions/conditionsOptions';

const ConditionForm = ({ action, onWorkupChange }) => {

  const currentType = action.workup['condition_type']

  const currentAdditionalInformationOptions = useMemo(() => { return conditionAdditionalInformationOptions[currentType] }, [currentType])

  const currentSelectedAdditionalInformationOption = useMemo(() => {
    return currentAdditionalInformationOptions.find(option => option.value === action.workup['condition_additional_information']) || currentAdditionalInformationOptions[0]
  })

  const handleCheckbox = (event) => {
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
    if (currentType === 'IRRADIATION') {
      return (
        <ListGroupItem>
          <NumericalnputWithUnit
            label='Power (Start)'
            name='power_value'
            value={action.workup['power_value']}
            inputRanges={conditionInputRanges['POWER']}
            onWorkupChange={onWorkupChange} />
          <br />

          <Label check>
            <Input type="checkbox" checked={action.workup['power_is_ramp']} onChange={handleCheckbox} />
            Power Ramp
          </Label>
          {action.workup['power_is_ramp'] ?
            <>
              <br />
              <NumericalnputWithUnit
                label='Power (End)'
                name='power_end_value'
                value={action.workup['power_end_value'] || action.workup['power_value'] || conditionInputRanges['POWER']['default']}
                inputRanges={conditionInputRanges['POWER']}
                onWorkupChange={onWorkupChange} />
            </> : <></>
          }

        </ListGroupItem>
      )
    }
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
        <NumericalnputWithUnit
          label={currentType}
          name='condition_value'
          value={action.workup['condition_value']}
          inputRanges={conditionInputRanges[currentType]}
          onWorkupChange={onWorkupChange} />
        {renderMicrowaveForm()}
      </ListGroupItem>
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
