import React, { useState } from 'react'

import { Button, Input } from 'reactstrap'

const StepForm = ({ processStep, nameSuggestionOptions, onSave, onCancel }) => {

  const [stepForm, setStepForm] = useState(processStep || {})

  const onInputChange = (field) => {
    const { name, value } = field;
    setStepForm(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const handleSave = () => {
    onSave(stepForm)
  }

  const handleSelect = (value) => {
    onInputChange({name: 'name', value: value})
  }

  const renderNameSuggestionSelect = () => {
    if (nameSuggestionOptions) {
      return (
        <select selected="current" type="select" onChange={event => handleSelect(nameSuggestionOptions[event.target.selectedIndex - 1].label)}>
          <option key="current" hidden="hidden">{stepForm.name}</option>
          {nameSuggestionOptions.map((suggestion) =>
            <option key={suggestion.value}>{suggestion.label}</option>)}
        </select>
      )
    } else {
      return;
    }
  }

  return (
    <>
      <Input size="sm" placeholder="Unnamed" value={stepForm.name} onChange={event => onInputChange({ name: 'name', value: event.target.value })} />
      {renderNameSuggestionSelect()}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button color="secondary" onClick={onCancel}>Cancel</Button>
        <Button color="success" onClick={handleSave}>Save</Button>
      </div>
    </>
  )

}

export default StepForm
