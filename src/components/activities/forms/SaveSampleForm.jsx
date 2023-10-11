import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import AmountInputSet from '../../utilities/AmountInputSet'
import ConditionTypeDecorator from '../../../decorators/ConditionTypeDecorator';
import FormSection from "../../utilities/FormSection";
import NumericalInputWithUnit from '../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";

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
    target_amount_unit: '',
    location: ''
  })

  useEffect(() => {
    setSampleForm(activity.workup)
  }, [activity.workup])

  const handleSampleChange = (name) => (value) => {
    onWorkupChange({ name: name, value: value })
  }

  return (
    <FormSection type='action' openSubFormLabel={openSubFormLabel}>
      <FormGroup>
        <Label>Name (Leave blank to autofill)</Label>
        <Input
          value={sampleForm.name}
          placeholder="Name"
          onChange={event => handleSampleChange('name')(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Short Label (Leave blank to autofill)</Label>
        <Input
          value={sampleForm.short_label}
          placeholder="Short Label"
          onChange={event => handleSampleChange('short_label')(event.target.value)}
        />
      </FormGroup>

      <AmountInputSet
        amount={sampleForm['target_amount_value']}
        maxAmounts={undefined}
        unit={sampleForm['target_amount_unit']}
        onChangeAmount={handleSampleChange('target_amount_value')}
        onChangeUnit={handleSampleChange('target_amount_unit')}
      />
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
          size='sm'
          width='80'
          checked={sampleForm['hide_in_eln']}
          onlabel='Hide'
          onstyle='outline-danger'
          offlabel='Show'
          offstyle='outline-success'
          onChange={checked => { handleSampleChange('hide_in_eln')(checked) }}
        />
      </SingleLineFormGroup>
    </FormSection>
  )
}

export default SaveSampleForm
