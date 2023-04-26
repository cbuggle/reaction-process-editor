import React from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'

import { analysisTypeOptions } from '../../../constants/dropdownOptions/analysisTypeOptions'
import SingleLineFormGroup from "../../utilities/SingleLineFormGroup";


const AnalysisForm = ({ activity, onWorkupChange }) => {
  return (
    <>
      <SingleLineFormGroup label='Type'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="analysis_type"
          options={analysisTypeOptions}
          value={analysisTypeOptions.find(option => option.value === activity.workup['analysis_type'])}
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
    </>
  )
}

export default AnalysisForm
