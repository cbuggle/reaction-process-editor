import React, { useState } from 'react';
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import CreateButton from "../utilities/CreateButton";

import StepForm from './StepForm';
import StepInfo from './StepInfo';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const StepColumCard = ({ processStep, reactionProcess, totalSteps, onChange }) => {

  const [showCard, setShowCard] = useState(processStep)
  const [showForm, setShowForm] = useState(false)

  const cardTitle = processStep ? processStep.label : 'New Step'

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
    canDrop: (monitor) => processStep && !processStep.locked
  }), [processStep])

  const dropItem = (monitor, processStep) => {
    console.log(monitor)
    console.log(processStep)
    api.updateProcessStepPosition(monitor.processStep.id, processStep.position).then(() => {
      onChange()
    })
  }


  return (
    showCard ?
      <div ref={dropRef} style={{ opacity: isOver ? 0.5 : 1 }}>
        <div ref={previewRef} style={{ opacity: isDragging ? 0 : 1, cursor: isDragging ? 'move' : 'grab' }}>
          <ColumnContainerCard
            title={cardTitle}
            type='step'
            showEditBtn={!showForm}
            showMoveXBtn={!showForm}
            showDeleteBtn={!showForm}
            showCancelBtn={showForm}
            onDelete={confirmDeleteStep}
            onEdit={toggleForm}
            onCancel={toggleForm}
            dragRef={dragRef}
          >
            {showForm ?
              <StepForm processStep={processStep}
                reactionProcess={reactionProcess}
                nameSuggestionOptions={reactionProcess.select_options.step_name_suggestions}
                onSave={onSave}
                onCancel={toggleForm}
              />
              :
              <StepInfo processStep={processStep} onChange={onChange} />}
          </ColumnContainerCard>
        </div></div>
      : <CreateButton label='New Step' type='step' onClick={createStep} />
  );
};

export default StepColumCard;
