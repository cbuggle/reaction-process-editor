import React from 'react'
import { Input, FormGroup } from 'reactstrap'
import Select from 'react-select'

import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup';

import { SelectOptions } from '../../../../../contexts/SelectOptions';
import { useContext } from 'react';
import FormSection from "../../../../utilities/FormSection";

const ExtractionForm = (
  {
    activity,
    onWorkupChange
  }) => {

  const selectOptions = useContext(SelectOptions)
  const purifySolventOptions = selectOptions.materials['SOLVENT']

  const actionPurifySolventIds = activity.workup['purify_solvent_sample_ids'] || []

  return (
    <FormSection type='action'>
      <FormGroup>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="automation_mode"
          options={selectOptions.automation_modes}
          value={selectOptions.automation_modes.find(option => option.value === activity.workup['automation'])}
          onChange={selectedOption => onWorkupChange({ name: 'automation', value: selectedOption.value })}
        />
      </FormGroup>
      <SingleLineFormGroup label='Solvents'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          isMulti
          name="purify_solvent_sample_ids"
          options={purifySolventOptions}
          value={purifySolventOptions.filter(option => actionPurifySolventIds.includes(option.value))}
          onChange={selectedOptions => onWorkupChange({ name: 'purify_solvent_sample_ids', value: selectedOptions.map(option => option.value) })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Ratio'>
        <Input
          value={activity.workup['purify_ratio']}
          placeholder="Ratio"
          onChange={event => onWorkupChange({ name: 'purify_ratio', value: event.target.value })}
        />
      </SingleLineFormGroup>
      { }
    </FormSection>
  )
}

export default ExtractionForm
