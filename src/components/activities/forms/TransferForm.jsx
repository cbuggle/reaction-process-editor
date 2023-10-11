import React, { useEffect, useState } from 'react'
import Select from 'react-select'

import AmountInputSet from '../../utilities/AmountInputSet';
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import SamplesDecorator from '../../../decorators/SamplesDecorator';

const TransferForm = (
  {
    activity,
    processStep,
    onWorkupChange
  }) => {

  useEffect(() => {
    onWorkupChange({ name: 'transfer_source_step_id', value: processStep.id })
    // eslint-disable-next-line
  }, [processStep])

  const sampleOptions = processStep.transfer_sample_options
  const transferToOptions = processStep.transfer_to_options

  const [sample, setSample] = useState(sampleOptions.find(sample => sample.value === activity.workup['sample_id']))

  const handleSampleChange = ({ sampleId, label }) => {
    // We have a chance of collisions on sampleID alone as we are coping with 2 different ActiveRecord models (Solvent, DiverseSolvent).
    const newSample = sampleOptions.find(sample => sample.value === sampleId && sample.label === label)
    if (newSample) {
      onWorkupChange({ name: 'acts_as', value: newSample.acts_as })
      onWorkupChange({ name: 'sample_id', value: newSample.value })
      onWorkupChange({ name: 'sample_name', value: newSample.label })
      onWorkupChange({ name: 'target_amount_value', value: newSample.amount })
      onWorkupChange({ name: 'sample_original_amount', value: newSample.amount })
      onWorkupChange({ name: 'target_amount_unit', value: newSample.unit })
    }
    setSample(newSample)
  }

  const handleValueChange = (name) => (value) => {
    onWorkupChange({ name: name, value: value })
  }

  return (
    <>
      <SingleLineFormGroup label='Transfer Sample'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_id"
          options={sampleOptions}
          value={sample}
          onChange={selectedOption => handleSampleChange({ sampleId: selectedOption.value, label: selectedOption.label })}
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
      <AmountInputSet
        amount={activity.workup['target_amount_value']}
        maxAmounts={sample?.unit_amounts}
        unit={activity.workup['target_amount_unit']}
        onChangeAmount={handleValueChange('target_amount_value')}
        onChangeUnit={handleValueChange('target_amount_unit')}
      />
    </>
  )
}

export default TransferForm
