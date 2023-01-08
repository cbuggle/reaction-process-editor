import React, { useMemo, useEffect } from 'react'
import { ListGroupItem, Row, Col, Button, UncontrolledTooltip } from 'reactstrap'

import Select from 'react-select'

import TemperatureInput from '../../utilities/TemperatureInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const TransferForm = ({action, processStep, onWorkupChange}) => {

  useEffect(() => {
    onWorkupChange({ name: 'transfer_source_step_id', value: processStep.id})
  }, [processStep])

  useEffect(() => {
    onWorkupChange({ name: 'transfer_percentage', value: action.workup['transfer_percentage'] || 100})
  }, [])

  const sampleOptions = useMemo(() => { return processStep.transfer_sample_options }, [])
  const transferToOptions = useMemo(() => { return processStep.transfer_to_options }, [])

  return (
    <div className="motion-form">
      <ListGroupItem>
        <Row>
          <Col md={4}>
            Transfer Sample:
            <Button id="transfer-sample-info-tooltip" className="step-header-button"
              size="lg" color="link">
              <FontAwesomeIcon icon={faInfoCircle} size="xs" />
              </Button>
            < UncontrolledTooltip target="transfer-sample-info-tooltip" >
              You can transfer any sample you have saved in the current Step.
            </UncontrolledTooltip >
            <Select
              name="sample_id"
              options={sampleOptions}
              value={sampleOptions.find(option => option.value === action.workup['sample_id'])}
              onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
            />
          </Col>
          <Col md={4}>
            Transfer to Step:
            <Button id="transfer-target-info-tooltip" className="step-header-button"
              size="lg" color="link">
              <FontAwesomeIcon icon={faInfoCircle} size="xs" />
              </Button>
            < UncontrolledTooltip target="transfer-target-info-tooltip" >
              Transfer possible to other steps. You need at least a second step to see possible transfer targets.
            </UncontrolledTooltip >
            <Select
              name="transfer_target_step_id"
              options={transferToOptions}
              value={transferToOptions.find(option => option.value === action.workup['transfer_target_step_id'])}
              onChange={selectedOption => onWorkupChange({ name: 'transfer_target_step_id', value: selectedOption.value })}
            />
          </Col>
          <Col md={4}>
            Percentage<br/>
            <TemperatureInput
              name='transfer_percentage'
              unit={'%'}
              precision={1}
              step={0.1}
              value={action.workup['transfer_percentage']}
              min={0}
              max={100}
              onWorkupChange={onWorkupChange} />
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  )
}

export default TransferForm
