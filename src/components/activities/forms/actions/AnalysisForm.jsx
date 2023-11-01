import React, { useContext } from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'

import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import { SelectOptions } from '../../../../contexts/SelectOptions';
import FormSection from "../../../utilities/FormSection";

const AnalysisForm = (
  {
    activity,
    onWorkupChange
  }) => {

  const selectOptions = useContext(SelectOptions)

  return (
    <FormSection type='action'>
      <SingleLineFormGroup label='Type'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="analysis_type"
          options={selectOptions.analysis_types}
          value={selectOptions.analysis_types.find(option => option.value === activity.workup['analysis_type'])}
          onChange={selectedOption => onWorkupChange({ name: 'analysis_type', value: selectedOption.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='CHMO ID'>
        <Input
          type="textarea"
          value={activity.workup['chmo_id']}
          placeholder="CHMO Id"
          onChange={event => onWorkupChange({ name: 'chmo_id', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Number'>
        <Input
          type="textarea"
          value={activity.workup['analysis_number']}
          placeholder="Description"
          onChange={event => onWorkupChange({ name: 'analysis_number', value: event.target.value })}
        />
      </SingleLineFormGroup>
    </FormSection>
  )
}

export default AnalysisForm
