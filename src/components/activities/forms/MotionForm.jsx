import React from 'react'
import { ListGroupItem, Row, Col } from 'reactstrap'
import NumericInput from 'react-numeric-input';
import Select from 'react-select'
import { RangeStepInput } from 'react-range-step-input';

import { motionModeOptions, motionTypeOptions } from '../../../constants/dropdownOptions/motionOptions'

const MotionForm = ({ action, onWorkupChange }) => {

  const handleRpmNumericInput = (value) => {
    onWorkupChange({ name: 'motion_speed', value: value })
  }

  const handleRpmSliderChange = (event) => {
    onWorkupChange({ name: 'motion_speed', value: event.target.value })
  }

  const sliderStep = () => {
    return motionTypeOptions.find(option => option.value === action.workup['motion_type']).step
  }

  return (
    <div className="motion-form">
      <ListGroupItem>
        <Row>
          <Col md={6}>
            <Select
              name="motion_mode"
              options={motionModeOptions}
              value={motionModeOptions.find(option => option.value === action.workup['motion_mode'])}
              onChange={selectedOption => onWorkupChange({ name: 'motion_mode', value: selectedOption.value })}
            />
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Row>
          <Col md={8}>
            <RangeStepInput value={action.workup['motion_speed']} min={0} max={9999} size={4} step={sliderStep(action.workup['motion_type'])} onChange={handleRpmSliderChange} snap />
          </Col>
          <Col md={2}>
            <NumericInput value={action.workup['motion_speed']} min={0} max={9999} size={4} step={sliderStep(action.workup['motion_type'])} onChange={handleRpmNumericInput} snap />
          </Col>
          <Col md={2}>
            {action.workup['motion_unit']}
          </Col>

        </Row>
      </ListGroupItem>
    </div>
  )
}

export default MotionForm
