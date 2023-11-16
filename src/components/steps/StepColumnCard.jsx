import React, { useState } from 'react';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';

import Activity from "../activities/Activity";
import ActivityCreator from "../activities/ActivityCreator";
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import ProcedureCard from "../utilities/ProcedureCard";
import StepInfo from './StepInfo';
import StepForm from './StepForm';

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

import { StepSelectOptions } from '../../contexts/StepSelectOptions';

const StepColumCard = (
  {
    processStep,
    reactionProcess,
    onCancel
  }) => {

  const isInitialised = !!processStep
  const [showForm, setShowForm] = useState(!isInitialised)
  const cardTitle = isInitialised ? processStep.label : 'New Step'
  const api = useReactionsFetcher()

  const displayMode = () => {
    return showForm ? 'form' : 'info'
  }

  const confirmDeleteStep = () => {
    window.confirm('Deleting the ProcessStep will irreversably delete this ' +
      'step and all associated actions. This can not be undone. Are you sure?')
      && deleteStep()
  }

  const deleteStep = () => api.deleteProcessStep(processStep.id)

  const handleCancel = () => {
    if (isInitialised) {
      toggleForm()
    } else {
      onCancel()
    }
  }

  const onSave = (stepForm) => {
    if (isInitialised) {
      api.updateProcessStep(stepForm)
      setShowForm(false)
    } else {
      api.createProcessStep(reactionProcess.id, stepForm)
      setShowForm(false)
      onCancel()
    }
  }

  const toggleForm = () => setShowForm(!showForm)

  const toggleLocked = () => { api.toggleProcessStepLock(processStep.id)}

  /* React-DnD drag source and drop target */
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: DndItemTypes.STEP,
    item: { processStep: processStep },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      canDrag: monitor.canDrag()
    }),
    canDrag: () => processStep && !processStep.locked
  }), [processStep])


  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: DndItemTypes.STEP,
    drop: (monitor) => dropItem(monitor, processStep),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    canDrop: () => processStep && !processStep.locked
  }), [processStep])

  const dropItem = (monitor, processStep) => {
    api.updateProcessStepPosition(monitor.processStep.id, processStep.position)
  }

  const renderActivities = () => {
    return (
      processStep.actions.map(activity => (
        <Activity
          key={activity.id}
          activity={activity}
          processStep={processStep}
        />
      ))
    )
  }

  return (
    <StepSelectOptions.Provider value={processStep?.select_options}>
      <div ref={dropRef} style={{ opacity: isOver ? 0.5 : 1 }}>
        <div ref={previewRef} style={{ opacity: isDragging ? 0 : 1, cursor: isDragging ? 'move' : 'grab' }}>
          <ColumnContainerCard
            title={cardTitle}
            type='step'
            showEditBtn={!showForm}
            showMoveXBtn={!showForm}
            showDeleteBtn={!showForm}
            showCancelBtn={showForm}
            showLockBtn={!showForm}
            onToggleLocked={toggleLocked}
            isLocked={processStep.locked}
            onDelete={confirmDeleteStep}
            onEdit={toggleForm}
            onCancel={handleCancel}
            displayMode={displayMode()}
            dragRef={dragRef}
          >
            <ProcedureCard.Info>
              <StepInfo processStep={processStep} />
            </ProcedureCard.Info>
            <ProcedureCard.Form>
              <StepForm
                processStep={processStep}
                reactionProcess={reactionProcess}
                nameSuggestionOptions={reactionProcess.select_options.step_name_suggestions}
                onSave={onSave}
                onCancel={handleCancel}
              />
            </ProcedureCard.Form>
            {isInitialised &&
              <ProcedureCard.Details>
                <div className='step-column-card__condition-container'>
                  {renderActivities()}
                  <ActivityCreator
                    processStep={processStep}
                    preconditions={processStep.final_conditions}
                    insertNewBeforeIndex={processStep.actions.length}
                  />
                </div>
              </ProcedureCard.Details>
            }
          </ColumnContainerCard>
        </div>
      </div>
    </StepSelectOptions.Provider>
  );
};

export default StepColumCard;
