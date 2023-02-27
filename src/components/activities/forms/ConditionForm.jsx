import React, { useMemo } from 'react'
import { ListGroupItem, Row, Col, Label, Input } from 'reactstrap'
import Select from 'react-select'

import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';

import { conditionInputRanges, conditionTendencyOptions, conditionAdditionalInformationOptions } from '../../../constants/dropdownOptions/conditionsOptions';
import ActivityForm from "./ActivityForm";

const ConditionForm = (
  {
    activity,
    previousConditions,
    onSave,
    onCancel,
    onWorkupChange
  }) => {

  const handleCheckbox = (event) => {
    onWorkupChange({ name: 'power_is_ramp', value: event.target.checked })

    if (!event.target.checked) {
      onWorkupChange({ name: 'power_end_value', value: "" })
    }
  }

  const renderMicrowaveForm = () => {
    return (
      <ListGroupItem>
        <NumericalInputWithUnit
          label='Power (Start)'
          name='power_value'
          value={activity.workup['power_value']}
          inputRanges={conditionInputRanges['POWER']}
          onWorkupChange={onWorkupChange} />
        <br />

        <Label check>
          <Input type="checkbox" checked={activity.workup['power_is_ramp']} onChange={handleCheckbox} />
          Power Ramp
        </Label>
        {activity.workup['power_is_ramp'] ?
          <>
            <br />
            <NumericalInputWithUnit
              label='Power (End)'
              name='power_end_value'
              value={activity.workup['power_end_value'] || activity.workup['power_value'] || conditionInputRanges['POWER']['default']}
              inputRanges={conditionInputRanges['POWER']}
              onWorkupChange={onWorkupChange} />
          </> : <></>
        }

      </ListGroupItem>
    )
  }

  return (
    <ActivityForm
      type='condition'
      activity={activity}
      onSave={onSave}
      onCancel={onCancel}
    >
      {/*<div className="motion-form">
        <ListGroupItem>
          <Row>
            <Col md={6}>
              {renderTendencySelect()}
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <NumericalInputWithUnit
            label={currentType}
            name='condition_value'
            value={activity.workup['condition_value']}
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
      </div>*/}
      <p>form goes here</p>
    </ActivityForm>
  )
}

export default ConditionForm
