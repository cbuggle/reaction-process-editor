import React, { useState, useMemo } from 'react'
import { Button, Label, Input, Form, FormGroup } from 'reactstrap'
import Select from 'react-select'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'
import PreparationInfo from './PreparationInfo'
import CreateButton from "../utilities/CreateButton";
import PreparationCard from "../preparations/PreparationCard";
import SpinnerWithMessage from "../utilities/SpinnerWithMessage";

const Preparation = ({ preparation, reactionProcess, onChange }) => {

  const preparationOptions = useMemo(() => { return reactionProcess.select_options.samples_preparations })

  const [showForm, setShowForm] = useState(false)
  const [initPreparation, setInitPreparation] = useState(false)
  const [preparationForm, updatePreparationForm] = useState(preparation || {})

  const api = useReactionsFetcher()

  const showCard = preparation || initPreparation
  const sampleName = preparation
      ? preparationOptions.samples.find(option => option.value === preparation.sample_id).label
      : ''
  const cardTitle = preparation ? sampleName : 'New Preparation'

  const onInputChange = (field) => {
    const { name, value } = field;
    updatePreparationForm(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const onSave = (e) => {
    e.preventDefault()
    api.updateSamplePreparation(reactionProcess.id, preparationForm).then(() => {
      closeForm()
      onChange()
    })
  }

  const onDelete = () => {
    api.deleteSamplePreparation(reactionProcess.id, preparationForm.id).then(() => {
      closeForm()
      onChange()
    })
  }

  const openForm = () => {
      setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setInitPreparation(false)
  }

  const createPreparation = () => {
      setShowForm(true)
      setInitPreparation(true)
  }

  const renderDeleteButton = () => {
    if (preparation) {
      return (<Button close color="outline-danger" onClick={onDelete} />)
    }
  }

  const renderInfo = () => {
    return (
      <Button color="outline-secondary" size="sm" onClick={openForm}>
        <PreparationInfo preparation={preparation} sampleName={sampleName} />
      </Button>
    )
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
    showCard ?
        <PreparationCard title={cardTitle}>
          {showForm ? renderForm() : renderInfo()}
        </PreparationCard>
    : <CreateButton label='New Preparation' type='preparation' onClick={createPreparation}/>
  )
}

export default Preparation
