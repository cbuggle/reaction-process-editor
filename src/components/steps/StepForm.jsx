import React, { useState } from 'react'

import { Button, Input } from 'reactstrap'
import FormButtons from "../utilities/FormButtons";

const StepForm = ({ processStep, nameSuggestionOptions, onSave, onCancel }) => {

  const [stepForm, setStepForm] = useState(processStep || {name: ''})

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
      <Input bsSize="sm" placeholder="Unnamed" value={stepForm.name} onChange={event => onInputChange({ name: 'name', value: event.target.value })} />
      {renderNameSuggestionSelect()}
      <FormButtons onSave={handleSave} onCancel={onCancel} type='step' />
    </>
  )

}

export default StepForm
