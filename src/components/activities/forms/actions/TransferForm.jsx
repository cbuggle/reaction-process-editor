import React, { useState, useContext } from 'react'
import Select from 'react-select'

import AmountInputSet from '../../../utilities/AmountInputSet';
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import SamplesDecorator from '../../../../decorators/SamplesDecorator';

import { StepSelectOptions } from '../../../steps/StepColumnCard';

const TransferForm = (
  {
    activity,
    onWorkupChange
  }) => {

  const stepSelectOptions = useContext(StepSelectOptions)
  const sampleOptions = stepSelectOptions.transferable_samples

  const [sample, setSample] = useState(sampleOptions.find(sample => sample.value === activity.workup['sample_id']))

  var transferToOptions = stepSelectOptions
    .transferable_to
    .filter(transferTarget => !transferTarget.saved_sample_ids.includes(sample?.id))

  const handleSampleChange = ({ sampleId, label }) => {
    // We have a chance of collisions on sampleID as we are coping with 2 different ActiveRecord models
    // with integer id (Solvent, DiverseSolvent; MediumSamples have uuid).
    const newSample = sampleOptions.find(sample => sample.value === sampleId && sample.label === label)
    if (newSample) {
      onWorkupChange({ name: 'acts_as', value: newSample.acts_as })
      onWorkupChange({ name: 'sample_id', value: newSample.value })
      onWorkupChange({ name: 'sample_name', value: newSample.label })
      onWorkupChange({ name: 'target_amount_value', value: newSample.amount })
      onWorkupChange({ name: 'sample_original_amount', value: newSample.amount })
      onWorkupChange({ name: 'target_amount_unit', value: newSample.unit })
    }

    let currentTarget = stepSelectOptions.transferable_to
      .find(transferTarget => transferTarget.value === activity.workup['transfer_target_step_id'])

    if (currentTarget?.saved_sample_ids.includes(newSample.id)) {
      onWorkupChange({ name: 'transfer_target_step_id', value: '' })
    }

    setSample(newSample)
  }

  const handleChangeAmount = ({ value, unit, percentage }) => {
    onWorkupChange({ name: "target_amount_value", value: value })
    onWorkupChange({ name: "target_amount_unit", value: unit })
    onWorkupChange({ name: "transfer_percentage", value: percentage })
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
          isDisabled={!!activity.id}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Transfer to Step'>
        <Select
          name="transfer_target_step_id"
          className="react-select--overwrite"
          classNamePrefix="react-select"
          options={transferToOptions}
          value={transferToOptions.filter(option => option.value === activity.workup['transfer_target_step_id'])}
          onChange={selectedOption => onWorkupChange({ name: 'transfer_target_step_id', value: selectedOption.value })}
          isDisabled={!!activity.id}
        />
      </SingleLineFormGroup>

      <SingleLineFormGroup label={SamplesDecorator.sampleSvgImg(sample)}>
        {/* Saved samples usually have no sampleSvgImg */}
        {sample && SamplesDecorator.availableAmountsInfoLine(sample['unit_amounts'])}
      </SingleLineFormGroup>

      <AmountInputSet
        amount={activity.workup['target_amount_value']}
        unit={activity.workup['target_amount_unit']}
        maxAmounts={sample?.unit_amounts}
        onChangeAmount={handleChangeAmount}
      />
    </>
  )
}

export default TransferForm
