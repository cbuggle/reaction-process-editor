import React, { useState, useContext } from 'react'
import Select from 'react-select'

import AmountInputSet from '../../../utilities/AmountInputSet';
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import OptionsDecorator from '../../../../decorators/OptionsDecorator';
import SamplesDecorator from '../../../../decorators/SamplesDecorator';

import { StepSelectOptions } from '../../../../contexts/StepSelectOptions';
import FormSection from "../../../utilities/FormSection";

const TransferForm = (
  {
    workup,
    onWorkupChange,
    isPersisted,
  }) => {

  const transferOptions = useContext(StepSelectOptions).FORMS.TRANSFER
  const sampleOptions = transferOptions.transferable_samples

  const [sample, setSample] = useState(OptionsDecorator.optionForValue(workup['sample_id'], sampleOptions))

  var transferToOptions = transferOptions.targets
    .filter(transferTarget => !transferTarget.saved_sample_ids.includes(sample?.id))

  const handleSampleChange = ({ sampleId, label }) => {
    // We have a chance of collisions on sampleID as we are coping with 2 different ActiveRecord models
    // with integer id (Solvent, DiverseSolvent; MediumSamples have uuid).
    const newSample = sampleOptions.find(sample => sample.value === sampleId && sample.label === label)
    if (newSample) {
      onWorkupChange({ name: 'acts_as', value: newSample.acts_as })
      onWorkupChange({ name: 'sample_id', value: newSample.value })
      onWorkupChange({ name: 'sample_name', value: newSample.label })
      onWorkupChange({ name: 'target_amount', value: { ...newSample.amount, ...{ percentage: 100 } } })
      onWorkupChange({ name: 'sample_original_amount', value: newSample.amount })
    }

    let currentTarget = OptionsDecorator.optionForValue(workup['transfer_target_step_id'], transferOptions.transfer_targets)

    if (currentTarget && currentTarget.saved_sample_ids.includes(newSample.id)) {
      onWorkupChange({ name: 'transfer_target_step_id', value: '' })
    }

    setSample(newSample)
  }

  const handleChangeAmount = (amount) => {
    onWorkupChange({ name: "target_amount", value: amount })

  }

  return (
    <FormSection type='action'>
      <SingleLineFormGroup label='Transfer Sample'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="sample_id"
          options={sampleOptions}
          value={sample}
          onChange={selectedOption => handleSampleChange({ sampleId: selectedOption.value, label: selectedOption.label })}
          isDisabled={isPersisted}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Transfer to Step'>
        <Select
          name="transfer_target_step_id"
          className="react-select--overwrite"
          classNamePrefix="react-select"
          options={transferToOptions}
          value={OptionsDecorator.optionForValue(workup['transfer_target_step_id'], transferToOptions)}
          onChange={selectedOption => onWorkupChange({ name: 'transfer_target_step_id', value: selectedOption.value })}
          isDisabled={isPersisted}
        />
      </SingleLineFormGroup>

      <SingleLineFormGroup label={SamplesDecorator.sampleSvgImg(sample)}>
        {/* Setting label even though initially/usually/most saved Samples have no sampleSvgImg */}
        {sample && SamplesDecorator.infoAvailableAmounts(sample['unit_amounts'])}
      </SingleLineFormGroup>

      <AmountInputSet
        amount={workup['target_amount']}
        maxAmounts={sample?.unit_amounts}
        onChangeAmount={handleChangeAmount}
      />
    </FormSection>
  )
}

export default TransferForm
