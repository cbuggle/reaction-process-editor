import React, { useEffect } from 'react'
import Select from 'react-select'

import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";

const TransferForm = (
  {
    activity,
    processStep,
    openSubFormLabel, // unused ?
    onWorkupChange
  }) => {

  useEffect(() => {
    onWorkupChange({ name: 'transfer_source_step_id', value: processStep.id })
    // eslint-disable-next-line
  }, [processStep])

  const sampleOptions = processStep.transfer_sample_options
  const transferToOptions = processStep.transfer_to_options

  return (
    <>
      <SingleLineFormGroup label='Transfer Sample'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_id"
          options={sampleOptions}
          value={sampleOptions.find(option => option.value === activity.workup['sample_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'sample_id', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Transfer to Step'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="transfer_target_step_id"
          isDisabled={!!activity.id}
          options={transferToOptions}
          value={transferToOptions.find(option => option.value === activity.workup['transfer_target_step_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'transfer_target_step_id', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <NumericalInputWithUnit
        label={ConditionTypeDecorator.label('PERCENTAGE')}
        value={activity.workup['transfer_percentage']}
        unitType={ConditionTypeDecorator.defaultUnitType('PERCENTAGE')}
        onChange={value => onWorkupChange({ name: 'transfer_percentage', value: value })}
      />
    </>
  )
}

export default TransferForm
