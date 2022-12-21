import React from 'react'

import { Button, UncontrolledTooltip } from 'reactstrap'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

const ProcessStepDeleteButton = ({ processStep, onDelete }) => {

  const api = useReactionsFetcher()

  const confirmDeleteStep = () => {

    window.confirm('Deleting the ProcessStep will irreversably delete this ' +
      'step and all associated actions. This can not be undone. Are you sure?')
      && deleteStep()
  }

  const deleteStep = () => {
    api.deleteProcessStep(processStep.id).then(() => {
      onDelete()
    })
  }

  return (
    <>
      <Button id={"delete-button-step-" + processStep.id} className="step-header-button"
        size="sm" color="outline-danger" onClick={confirmDeleteStep}>x</Button>
      < UncontrolledTooltip target={"delete-button-step-" + processStep.id} >
        Delete Step
      </UncontrolledTooltip >
    </>
  )
}

export default ProcessStepDeleteButton
