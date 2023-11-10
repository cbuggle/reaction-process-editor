import React, { useContext, useEffect, useState } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'

import AmountInputSet from '../../../utilities/AmountInputSet'
import ButtonGroupToggle from "../../../utilities/ButtonGroupToggle";
import FormSection from "../../../utilities/FormSection";
import MetricsInput from '../../../utilities/MetricsInput';
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import { SelectOptions } from '../../../../contexts/SelectOptions'

const SaveSampleForm = (
  {
    activity,
    onWorkupChange
  }) => {

  const selectOptions = useContext(SelectOptions)

  const [sampleForm, setSampleForm] = useState(activity.workup)

  useEffect(() => {
    setSampleForm(activity.workup)
  }, [activity.workup])

  const handleChangeSampleWorkup = (workupKey) => (value) => {
    onWorkupChange({ name: workupKey, value: value })
  }

  return (
    <FormSection type='action'>
      <FormGroup>
        <Label>Name</Label>
        <Input
          value={sampleForm.name}
          placeholder="Name (Leave blank to autofill)"
          onChange={event => handleChangeSampleWorkup('name')(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Short Label</Label>
        <Input
          value={sampleForm.short_label}
          placeholder="Short Label (Leave blank to autofill)"
          onChange={event => handleChangeSampleWorkup('short_label')(event.target.value)}
        />
      </FormGroup>
      <AmountInputSet
        amount={sampleForm.target_amount}
        maxAmounts={undefined}
        onChangeAmount={handleChangeSampleWorkup('target_amount')}
      />
      <MetricsInput
        metricName={'PURITY'}
        amount={sampleForm.purity}
        onChange={handleChangeSampleWorkup('purity')}
      />
      <SingleLineFormGroup label='Location'>
        <Input
          type="textarea"
          value={sampleForm.location}
          placeholder="Location"
          onChange={event => handleChangeSampleWorkup('location')(event.target.value)}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Sample Type'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="intermediate_type"
          options={selectOptions.save_sample_types}
          value={selectOptions.save_sample_types.find(option => option.value === sampleForm.intermediate_type)}
          onChange={selectedOption => handleChangeSampleWorkup('intermediate_type')(selectedOption.value)}
        />
      </SingleLineFormGroup>
      <ButtonGroupToggle
        value={!!sampleForm.hide_in_eln}
        options={
          [
            {
              value: false,
              label: 'show'
            },
            {
              value: true,
              label: 'hide'
            }
          ]
        }
        onChange={selectedValue => { handleChangeSampleWorkup('hide_in_eln')(selectedValue) }}
        size='sm'
        label='Display in ELN'
      />
    </FormSection>
  )
}

export default SaveSampleForm
