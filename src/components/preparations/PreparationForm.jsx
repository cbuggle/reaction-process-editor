import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, FormFeedback } from 'reactstrap'
import Select from 'react-select'

import FormButtons from "../utilities/FormButtons";

import { samplePreparationOptions } from '../../constants/samplePreparationTypes';

const PreparationForm = ({ preparation, preparationOptions, onSave, onCancel }) => {

  const [preparationForm, updatePreparationForm] = useState(preparation || {details: ''})
  const [formIncomplete, setFormIncomplete] = useState(false)


  const sampleOptions = preparation ? preparationOptions.prepared_samples : preparationOptions.unprepared_samples

  const onInputChange = (field) => {
    const { name, value } = field;
    updatePreparationForm(prevState => ({
      ...prevState, [name]: value
    }));
    if(formIncomplete && name === 'sample_id') {
      setFormIncomplete(!value)
    }
  }

  const handleSave = (e) => {
    if (!!preparationForm.sample_id) {
      onSave(preparationForm)
    } else {
      setFormIncomplete(true)
    }
  }

  return (
    <Form>
      <FormGroup>
        <Label>Sample</Label>
        { }
        <Select
          className={'react-select--overwrite' + (formIncomplete ? ' is-invalid' : '')}
          classNamePrefix='react-select'
          name="sample_id"
          isDisabled={!!preparation}
          options={sampleOptions}
          value={sampleOptions.filter(option => (option.value === preparationForm.sample_id))}
          onChange={selectedOption => onInputChange({ name: 'sample_id', value: selectedOption.value })}
        />
        <FormFeedback>
          Please select a sample!
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Preparations</Label>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          isMulti
          name="preparations"
          options={samplePreparationOptions}
          value={samplePreparationOptions.filter(option => (preparationForm.preparations || []).includes(option.value))}
          onChange={selectedOptions => onInputChange({ name: 'preparations', value: selectedOptions.map(option => option.value) })}
        />
      </FormGroup>
      <FormGroup>
        <Label>Equipment</Label>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
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
