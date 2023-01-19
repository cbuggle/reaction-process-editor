import React, { useState } from 'react';
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import Dummy from "../utilities/Dummy";

import StepForm from './StepForm';
import StepInfo from './StepInfo';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";
import StepActivity from "./StepActivity";
import StepActivityCreator from "./StepActivityCreator";

const StepColumCard = (
  {
    processStep,
    reactionProcess,
    onChange,
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

  const deleteStep = () => {
    api.deleteProcessStep(processStep.id).then(() => {
      onChange()
    })
  }

  const handleCancel = () => {
    if (isInitialised) {
      toggleForm()
    } else {
      onCancel()
    }
  }

  const onSave = (stepForm) => {
    if (isInitialised) {
      api.updateProcessStep(stepForm).then(() => {
        setShowForm(false)
        onChange()
      })
    } else {
      api.createProcessStep(reactionProcess.id, stepForm).then(() => {
        onCancel()
        setShowForm(false)
        onChange()
      })
    }
  }

  const toggleForm = () => {
    setShowForm(!showForm)
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
          onCancel={handleCancel}
          displayMode={displayMode()}
          dragRef={dragRef}
        >
          <Dummy.Info>
            <StepInfo processStep={processStep} onChange={onChange} />
          </Dummy.Info>
          <Dummy.Form>
            <StepForm
              processStep={processStep}
              reactionProcess={reactionProcess}
              nameSuggestionOptions={reactionProcess.select_options.step_name_suggestions}
              onSave={onSave}
              onCancel={handleCancel}
            />
          </Dummy.Form>
          {isInitialised &&
            <Dummy.Details>
              {processStep.actions.map(action => (
                <StepActivity key={action.id} action={action} processStep={processStep} onChange={onChange} />
              ))}
              <StepActivityCreator processStep={processStep} onChange={onChange} />
            </Dummy.Details>
          }
        </ColumnContainerCard>
      </div>
    </div>
  );
};

export default StepColumCard;
