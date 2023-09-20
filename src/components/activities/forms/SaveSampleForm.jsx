import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';

import { conditionTypes } from '../../../constants/conditionTypes';
import { sampleVolumeUnitOptions } from '../../../constants/dropdownOptions/samplesOptions'
import { saveSampleTypeOptions } from '../../../constants/dropdownOptions/transferOptions';
import FormSection from "../../utilities/FormSection";

const SaveSampleForm = (
  {
    activity,
    openSubFormLabel,
    onWorkupChange
  }) => {

  const [sampleForm, setSampleForm] = useState({
    name: '',
    short_label: '',
    description: '',
    target_amount_value: '',
    location: ''
  })

  const purityInputType = conditionTypes['PERCENTAGE'].unitTypes['PURITY']

  useEffect(() => {
    setSampleForm(activity.workup['sample'])
  }, [activity.workup['sample']])

  const onInputChange = (field) => {
    const { name, value } = field;
    onWorkupChange(({ name: 'sample', value: { ...activity.workup['sample'], [name]: value } }
    ));
  }

  return (
    <FormSection type='action' openSubFormLabel={openSubFormLabel}>
      <FormGroup>
        <Label>Name (optional / autofill)</Label>
        <Input
          value={sampleForm.name}
          placeholder="Name"
          onChange={event => onInputChange({ name: 'name', value: event.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label>Short Label (optional / autofill)</Label>
        <Input
          value={sampleForm.short_label}
          placeholder="Short Label"
          onChange={event => onInputChange({ name: 'short_label', value: event.target.value })}
        />
      </FormGroup>
      <SingleLineFormGroup label='Volume/Amount'>
        <Input
          value={sampleForm['target_amount_value']}
          placeholder="Amount"
          onChange={event => onInputChange({ name: 'target_amount_value', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Unit'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="target_amount_unit"
          options={sampleVolumeUnitOptions}
          value={sampleVolumeUnitOptions.find(item => item.value === sampleForm['target_amount_unit'])}
          onChange={selectedOption => onInputChange({ name: 'target_amount_unit', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <NumericalInputWithUnit
        label='Purity'
        name='purity'
        value={sampleForm['purity']}
        unitType={purityInputType}
        onWorkupChange={onInputChange}
      />
      <SingleLineFormGroup label='Location'>
        <Input
          type="textarea"
          value={sampleForm.location}
          placeholder="Location"
          onChange={event => onInputChange({ name: 'location', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Sample Type'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="intermediate_type"
          options={saveSampleTypeOptions}
          value={saveSampleTypeOptions.find(option => option.value === sampleForm['intermediate_type'])}
          onChange={selectedOption => onInputChange({ name: 'intermediate_type', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Display in ELN'>
        <BootstrapSwitchButton
          width='200'
          checked={activity.workup['hide_in_eln']}
          onlabel='Hide in ELN'
          onstyle='outline-danger'
          offlabel='Show in ELN'
          offstyle='outline-success'
          onChange={(checked) => {
            onWorkupChange({ name: 'hide_in_eln', value: checked })
          }}
        />
      </SingleLineFormGroup>
    </FormSection>
  )
}

export default SaveSampleForm
