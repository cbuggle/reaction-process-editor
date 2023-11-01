import React, { useContext, useEffect, useState } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import FormSection from "../../../utilities/FormSection";
import AmountInputSet from '../../../utilities/AmountInputSet'
import NumericalInputWithUnit from '../../../utilities/NumericalInputWithUnit';
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import MetricsDecorator from '../../../../decorators/MetricsDecorator';

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

  const handleChangeSampleWorkup = (name) => (value) => {
    onWorkupChange({ name: name, value: value })
  }

  const handleChangeAmountInput = ({ value, unit }) => {
    onWorkupChange({ name: "target_amount_value", value: value })
    onWorkupChange({ name: "target_amount_unit", value: unit })
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
        amount={sampleForm.target_amount_value}
        unit={sampleForm.target_amount_unit}
        maxAmounts={undefined}
        onChangeAmount={handleChangeAmountInput}
      />
      <NumericalInputWithUnit
        label={MetricsDecorator.label('PURITY')}
        value={sampleForm.purity}
        unitType={MetricsDecorator.defaultUnitType('PURITY')}
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
      <SingleLineFormGroup label='Display in ELN'>
        <BootstrapSwitchButton
          size='sm'
          width='80'
          checked={sampleForm.hide_in_eln}
          onlabel='Hide'
          onstyle='outline-danger'
          offlabel='Show'
          offstyle='outline-success'
          onChange={checked => { handleChangeSampleWorkup('hide_in_eln')(checked) }}
        />
      </SingleLineFormGroup>
    </FormSection>
  )
}

export default SaveSampleForm
