import React, { useState } from 'react'

import CreateButton from "../utilities/CreateButton";
import PreparationCard from "../preparations/PreparationCard";
import PreparationInfo from "./PreparationInfo"
import PreparationForm from '../preparations/PreparationForm';
import ProcedureCard from "../utilities/ProcedureCard";

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'

const Preparation = ({ preparation, reactionProcess }) => {

  const api = useReactionsFetcher()

  const [showForm, setShowForm] = useState(false)
  const [initPreparation, setInitPreparation] = useState(false)
  const preparationOptions = reactionProcess.select_options.samples_preparations

  const showCard = preparation || initPreparation
  const sampleName = preparation
    ? preparationOptions.prepared_samples.find(option => option.value === preparation.sample_id).label
    : ''
  const cardTitle = preparation ? sampleName : 'New Preparation'

  const onDelete = () => {
    api.deleteSamplePreparation(reactionProcess.id, preparation.id)
    closeForm()
  }

  const onSave = (preparationForm) => {
    api.updateSamplePreparation(reactionProcess.id, preparationForm)
    closeForm()
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

  return (
    showCard ?
      <PreparationCard title={cardTitle} onEdit={openForm} onDelete={onDelete} onCancel={closeForm} showForm={showForm} >
        <ProcedureCard.Info>
          <PreparationInfo preparation={preparation} preparationOptions={preparationOptions} />
        </ProcedureCard.Info>
        <ProcedureCard.Form>
          <PreparationForm preparation={preparation} preparationOptions={preparationOptions} onSave={onSave} onCancel={closeForm} />
        </ProcedureCard.Form>
      </PreparationCard>
      : <CreateButton label='New Preparation' type='preparation' onClick={createPreparation} />
  )
}

export default Preparation
