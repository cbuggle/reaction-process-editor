import React, { useState, useMemo } from 'react'
import { Button, Label, Input, Form, FormGroup } from 'reactstrap'
import Select from 'react-select'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'
import SamplePreparation from './SamplePreparation'
import CreateButton from "../utilities/CreateButton";

const SamplePreparationForm = ({ preparation, reactionProcess, onChange }) => {

  const preparationOptions = useMemo(() => { return reactionProcess.select_options.samples_preparations })

  const [showForm, setShowForm] = useState(false)
  const [preparationForm, updatePreparationForm] = useState(preparation || {
  })

  const api = useReactionsFetcher()

  const onInputChange = (field) => {
    const { name, value } = field;
    updatePreparationForm(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const onSave = (e) => {
    e.preventDefault()
    api.updateSamplePreparation(reactionProcess.id, preparationForm).then(() => {
      setShowForm(false)
      onChange()
    })
  }

  const onDelete = () => {
    api.deleteSamplePreparation(reactionProcess.id, preparationForm.id).then(() => {
      setShowForm(false)
      onChange()
    })
  }

  const openForm = () => {
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
  }

  const renderDeleteButton = () => {
    if (preparation) {
      return (<Button close color="outline-danger" onClick={onDelete} />)
    }
  }

  const renderInfo = () => {
    if (preparation) {
      return (
        <Button color="outline-secondary" size="sm" onClick={openForm}>
          <SamplePreparation preparation={preparation} preparationOptions={preparationOptions} />
        </Button>
      )
    } else {
      return (<CreateButton label='New Preparation' type='preparation' onClick={openForm}/>)
    }
  }

  const renderForm = () => {
    return (
      <Form>
        <FormGroup>
          <Label>Sample</Label>
          <Select
            name="sample_id"
            options={preparationOptions.samples}
            value={preparationOptions.samples.filter(option => (option.value === preparationForm.sample_id))}
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
        {renderDeleteButton()}
        <Button color="secondary" className="float-left" onClick={closeForm}>Cancel</Button>
        <Button type="submit" color="success" className="float-right" onClick={onSave}>Save</Button>
      </Form>
    )
  }

  return (
    <>
      {showForm ? renderForm() : renderInfo()}
    </>
  )
}

export default SamplePreparationForm
