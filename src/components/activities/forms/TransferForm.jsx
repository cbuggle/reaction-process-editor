import React, { useMemo, useEffect } from 'react'
import { ListGroupItem, Row, Col, Button, UncontrolledTooltip } from 'reactstrap'

import Select from 'react-select'

import NumericalnputWithUnit from '../../utilities/NumericalInputWithUnit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ActionFormGroup from "./ActionFormGroup";

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
    <>
      <ActionFormGroup
        label='Transfer Sample'
        tooltip='You can transfer any sample you have saved in the current step.'
        tooltipId='sample-tip'
      >
        <Select
          name="sample_id"
          options={sampleOptions}
          value={sampleOptions.find(option => option.value === action.workup['sample_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
        />
      </ActionFormGroup>
      <ActionFormGroup
        label='Transfer to Step'
        tooltip='Transfer possible to other steps. You need at least a second step to see possible transfer targets.'
        tooltipId='step-tip'
      >
        <Select
          name="transfer_target_step_id"
          isDisabled={!!action.id}
          options={transferToOptions}
          value={transferToOptions.find(option => option.value === action.workup['transfer_target_step_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'transfer_target_step_id', value: selectedOption.value })}
        />
      </ActionFormGroup>
      <NumericalnputWithUnit
        label='Percentage'
        name='transfer_percentage'
        unit={'%'}
        precision={1}
        step={0.1}
        value={action.workup['transfer_percentage']}
        min={0}
        max={100}
        onWorkupChange={onWorkupChange}
      />
    </>
  )
}

export default TransferForm
