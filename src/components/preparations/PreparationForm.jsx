import React, { useState, useMemo } from 'react'
import { Button, Label, Input, Form, FormGroup } from 'reactstrap'
import Select from 'react-select'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'
import FormButtons from "../utilities/FormButtons";

const PreparationForm = ({ preparation, preparationOptions, onSave, onCancel }) => {

  const api = useReactionsFetcher()

  const [preparationForm, updatePreparationForm] = useState(preparation || {})

  const sampleOptions = preparation ? preparationOptions.prepared_samples : preparationOptions.unprepared_samples

  const onInputChange = (field) => {
    const { name, value } = field;
    updatePreparationForm(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const handleSave = (e) => {
    onSave(preparationForm)
  }

  return (
    <Form>
      <FormGroup>
        <Label>Sample</Label>
        { }
        <Select
          name="sample_id"
          isDisabled={!!preparation}
          options={sampleOptions}
          value={sampleOptions.filter(option => (option.value === preparationForm.sample_id))}
          onChange={selectedOption => onInputChange({ name: 'sample_id', value: selectedOption.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label>Details</Label>
        <Select
          isMulti
          name="preparations"
          options={preparationOptions.preparations}
          value={preparationOptions.preparations.filter(option => (preparationForm.preparations || []).includes(option.value))}
          onChange={selectedOptions => onInputChange({ name: 'preparations', value: selectedOptions.map(option => option.value) })}
        />
      </FormGroup>
      <FormGroup>
        <Label>Equipment</Label>
        <Select
          isMulti
          name="equipment"
          options={preparationOptions.equipment}
          value={preparationOptions.equipment.filter(option => (preparationForm.equipment || []).includes(option.value))}
          onChange={selectedOptions => onInputChange({ name: 'equipment', value: selectedOptions.map(option => option.value) })}
        />
      </FormGroup>
      <FormGroup>
        <Label>Details</Label>
        <Input
          value={preparationForm.details}
          placeholder="Details"
          onChange={event => onInputChange({ name: 'details', value: event.target.value })}
        />
      </FormGroup>
      <FormButtons onSave={handleSave} onCancel={onCancel} type='preparation' />
    </Form>
  )
}

export default PreparationForm
