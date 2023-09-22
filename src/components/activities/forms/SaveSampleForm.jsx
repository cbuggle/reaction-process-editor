import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';
import FormSection from "../../utilities/FormSection";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";

import { sampleVolumeUnitOptions } from '../../../constants/dropdownOptions/samplesOptions'
import { saveSampleTypeOptions } from '../../../constants/dropdownOptions/transferOptions';

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

  useEffect(() => {
    setSampleForm(activity.workup['sample'])
  }, [activity.workup])

  const handleSampleChange = (name) => (value) => {
    onWorkupChange({ name: 'sample', value: { ...activity.workup['sample'], [name]: value } })
  }

  return (
    <FormSection type='action' openSubFormLabel={openSubFormLabel}>
      <FormGroup>
        <Label>Name (optional / autofill)</Label>
        <Input
          value={sampleForm.name}
          placeholder="Name"
          onChange={event => handleSampleChange('name')(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Short Label (optional / autofill)</Label>
        <Input
          value={sampleForm.short_label}
          placeholder="Short Label"
          onChange={event => handleSampleChange('short_label')(event.target.value)}
        />
      </FormGroup>
      <SingleLineFormGroup label='Volume/Amount'>
        <Input
          value={sampleForm['target_amount_value']}
          placeholder="Amount"
          onChange={event => handleSampleChange('target_amount_value')(event.target.value)}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Unit'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="target_amount_unit"
          options={sampleVolumeUnitOptions}
          value={sampleVolumeUnitOptions.find(item => item.value === sampleForm['target_amount_unit'])}
          onChange={selectedOption => handleSampleChange('target_amount_unit')(selectedOption.value)}
        />
      </SingleLineFormGroup>
      <NumericalInputWithUnit
        label={ConditionTypeDecorator.label('PURITY')}
        value={sampleForm['purity']}
        unitType={ConditionTypeDecorator.defaultUnitType('PURITY')}
        onChange={handleSampleChange('purity')}
      />
      <SingleLineFormGroup label='Location'>
        <Input
          type="textarea"
          value={sampleForm.location}
          placeholder="Location"
          onChange={event => handleSampleChange('location')(event.target.value)}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Sample Type'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="intermediate_type"
          options={saveSampleTypeOptions}
          value={saveSampleTypeOptions.find(option => option.value === sampleForm['intermediate_type'])}
          onChange={selectedOption => handleSampleChange('intermediate_type')(selectedOption.value)}
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
          onChange={checked => { handleSampleChange('hide_in_eln')(checked) }}
        />
      </SingleLineFormGroup>
    </FormSection>
  )
}

export default SaveSampleForm
