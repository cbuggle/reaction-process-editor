import React from 'react'

import { ListGroupItem, FormGroup, Label, Input } from 'reactstrap'


const AnalysisForm = ({action, onWorkupChange}) => {
  return (
    <ListGroupItem>
      <FormGroup>
        <Label>Nummer</Label>
        <Input
          type="textarea"
          value={action.workup['analysis_number']}
          placeholder="Description"
          onChange={event => onWorkupChange({ name: 'analysis_number', value: event.target.value })}
        />
      </FormGroup>
    </ListGroupItem>
  )
}

export default AnalysisForm
