import React, { useState } from 'react';
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import CreateButton from "../utilities/CreateButton";

import StepForm from './StepForm';
import StepInfo from './StepInfo';

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const StepColumCard = ({ processStep, reactionProcess, totalSteps, onChange }) => {

  const [showCard, setShowCard] = useState(processStep)
  const [showForm, setShowForm] = useState(false)

  const cardTitle = processStep ? ((processStep.position + 1) + '/' + totalSteps + ' ' + (processStep.name || '')) : 'New Step'

  const api = useReactionsFetcher()

  const confirmDeleteStep = () => {

    window.confirm('Deleting the ProcessStep will irreversably delete this ' +
      'step and all associated actions. This can not be undone. Are you sure?')
      && deleteStep()
  }

  const deleteStep = () => {
    api.deleteProcessStep(processStep.id).then(() => {
      onChange()
    })
  }

  const onSave = (stepForm) => {
    if (stepForm.id) {
      api.updateProcessStep(stepForm).then(() => {
        setShowForm(false)
        onChange()
      })
    } else {
      api.createProcessStep(reactionProcess.id, stepForm).then(() => {
        setShowForm(false)
        setShowCard(false)
        onChange()
      })
    }
  }

  const createStep = () => {
    setShowCard(true)
    setShowForm(true)
  }

  const toggleForm = () => {
    setShowForm(!showForm)
    setShowCard(processStep)
  }

  return (
    showCard ?
      <ColumnContainerCard title={cardTitle} type='step' onDelete={confirmDeleteStep} onEdit={toggleForm}>
        {showForm ?
          <StepForm processStep={processStep}
            reactionProcess={reactionProcess}
            nameSuggestionOptions={reactionProcess.select_options.step_name_suggestions}
            onSave={onSave}
            onCancel={toggleForm} />
          :
          <StepInfo processStep={processStep} onChange={onChange} />}
      </ColumnContainerCard>
      : <CreateButton label='New Step' type='step' onClick={createStep} />
  );
};

export default StepColumCard;
