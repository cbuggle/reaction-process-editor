import React from 'react'
import { ListGroupItem, FormGroup, Label, Input } from 'reactstrap'
import Select from 'react-select'

import { analysisTypeOptions } from '../../../constants/dropdownOptions/analysisTypeOptions'
import ActionFormGroup from "./ActionFormGroup";


const AnalysisForm = ({ action, onWorkupChange }) => {
  return (
    <>
      <ActionFormGroup label='Type'>
        <Select
          name="analysis_type"
          options={analysisTypeOptions}
          value={analysisTypeOptions.find(option => option.value === action.workup['analysis_type'])}
          onChange={selectedOption => onWorkupChange({ name: 'analysis_type', value: selectedOption.value })}
        />
      </ActionFormGroup>
      <ActionFormGroup label='CHMO ID'>
        <Input
          type="textarea"
          value={action.workup['chmo_id']}
          placeholder="CHMO Id"
          onChange={event => onWorkupChange({ name: 'chmo_id', value: event.target.value })}
        />
      </ActionFormGroup>
      <ActionFormGroup label='Number'>
        <Input
          type="textarea"
          value={action.workup['analysis_number']}
          placeholder="Description"
          onChange={event => onWorkupChange({ name: 'analysis_number', value: event.target.value })}
        />
      </ActionFormGroup>
    </>
  )
}

export default AnalysisForm
