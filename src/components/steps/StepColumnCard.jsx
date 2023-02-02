import React, { useState } from 'react';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';
import StepForm from './StepForm';
import StepInfo from './StepInfo';
import Activity from "../activities/Activity";
import ActivityCreator from "../activities/ActivityCreator";
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import ProcedureCard from "../utilities/ProcedureCard";
import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";
import ConditionBeamsImage from "../activities/ConditionBeamsImage";

const StepColumCard = (
  {
    processStep,
    reactionProcess,
    onCancel
  }) => {

  const isInitialised = !!processStep
  const [showForm, setShowForm] = useState(!isInitialised)
  const [maxOpenConditions, setMaxOpenConditions] = useState(0)
  const cardTitle = isInitialised ? processStep.label : 'New Step'
  const api = useReactionsFetcher()
  const lanes = []
  const [conditionLevels, setConditionLevels] = useState(() => {
    const levels = []
    let currentOpenConditions = 0
    processStep.actions.forEach((action, index) => {
      if(action.action_name === "CONDITION") {
        let freeLane = lanes.findIndex((element) => element === undefined)
        if(freeLane == -1) {
          freeLane = lanes.length
        }
        levels[action.activity_number] = {
          level: freeLane,
          activityNumber: action.activity_number,
          startIndex: index
        }
        lanes[freeLane] = action.activity_number
        currentOpenConditions++
        setMaxOpenConditions(Math.max(maxOpenConditions, currentOpenConditions))
      } else if(action.action_name === "CONDITION_END") {
        const laneIndex = lanes.findIndex((element) => element === action.activity_number)
        lanes[laneIndex] = undefined
        levels[action.activity_number].endIndex = index
        currentOpenConditions--
      }
      console.log(lanes)
    })
    return levels
  })

  const displayMode = () => {
    return showForm ? 'form' : 'info'
  }

  const confirmDeleteStep = () => {
    window.confirm('Deleting the ProcessStep will irreversably delete this ' +
      'step and all associated actions. This can not be undone. Are you sure?')
      && deleteStep()
  }

  const deleteStep = () => {
    api.deleteProcessStep(processStep.id)
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
      api.updateProcessStep(stepForm)
      setShowForm(false)
    } else {
      api.createProcessStep(reactionProcess.id, stepForm)
      setShowForm(false)
      onCancel()
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
    api.updateProcessStepPosition(monitor.processStep.id, processStep.position)
  }

  const getCardWidth = (action) => {
    if (action.action_name === "CONDITION" || action.action_name === "CONDITION_END") {
      const level = maxOpenConditions - conditionLevels[action.activity_number].level
      return (374 + level * 20) + 'px'
    } else {
        return 'inherit'
    }
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
          <ProcedureCard.Info>
            <StepInfo processStep={processStep} />
            {'MaxOpenCondtions: ' + maxOpenConditions}
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
              {processStep.actions.map(action => (
                <Activity
                  key={action.id}
                  action={action}
                  processStep={processStep}
                  cardWidth={getCardWidth(action)}
                />
              ))}
              <ActivityCreator processStep={processStep} />
              <ConditionBeamsImage width={maxOpenConditions * 20} height={800} beams={conditionLevels} />
            </ProcedureCard.Details>
          }
        </ColumnContainerCard>
      </div>
    </div>
  );
};

export default StepColumCard;
