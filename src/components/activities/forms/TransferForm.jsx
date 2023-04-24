import React, { useMemo, useEffect } from 'react'
import Select from 'react-select'

import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import NumericalnputWithUnit from '../../utilities/NumericalInputWithUnit';
import { conditionInputRanges } from '../../../constants/dropdownOptions/conditionsOptions';

const TransferForm = ({ activity, processStep, onWorkupChange }) => {

  useEffect(() => {
    onWorkupChange({ name: 'transfer_source_step_id', value: processStep.id })
  }, [processStep])

  useEffect(() => {
    onWorkupChange({ name: 'transfer_percentage', value: activity.workup['transfer_percentage'] || 100 })
  }, [])

  const sampleOptions = useMemo(() => { return processStep.transfer_sample_options }, [])
  const transferToOptions = useMemo(() => { return processStep.transfer_to_options }, [])

  return (
    <>
      <SingleLineFormGroup label='Transfer Sample'>
        <Select
          name="sample_id"
          options={sampleOptions}
          value={sampleOptions.find(option => option.value === activity.workup['sample_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Transfer to Step'>
        <Select
          name="transfer_target_step_id"
          isDisabled={!!activity.id}
          options={transferToOptions}
          value={transferToOptions.find(option => option.value === activity.workup['transfer_target_step_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'transfer_target_step_id', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <NumericalnputWithUnit
        label='Percentage'
        name='transfer_percentage'
        value={activity.workup['transfer_percentage']}
        inputRanges={conditionInputRanges['PERCENTAGE']}
        onWorkupChange={onWorkupChange}
      />
    </>
  )
}

export default TransferForm
