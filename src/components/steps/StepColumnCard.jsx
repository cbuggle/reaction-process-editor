import React, { useState, useEffect, createRef } from 'react';
import Measure from "react-measure";

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
import getContentRect from "react-measure/src/get-content-rect";

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
  const [stepsHeight, setStepsHeight] = useState(0)
  const [activities, setActivities] = useState([])
  const [conditions, setConditions] = useState({})
  const [lanes, setLanes] = useState([])

  useEffect(() => {
    console.log('init')
    sortActivity()
  }, []);

  useEffect(() => {
    console.log('update')
    sortActivity()
  }, [processStep]);

  useEffect(() => {
    console.log('activities updated')
    updateConditionBeams()
  }, [activities]);

  const sortActivity = () => {
    console.log('sortActivity ' + processStep.actions)
    const activities = []
    const conditions ={}
    setMaxOpenConditions(0)
    setLanes([])
    let currentOpenConditions = 0
    processStep.actions.forEach((action, index) => {
      activities[index] = {
        action: action,
        condition: {beamRef: undefined}
      }
      if(action.action_name === "CONDITION") {
        let freeLane = lanes.findIndex((element) => element === undefined)
        if(freeLane === -1) {
          freeLane = lanes.length
        }
        conditions[action.activity_number] = {
          level: freeLane,
          activityNumber: action.activity_number,
          startRef: React.createRef(),
          endRef: React.createRef(),
          startY: 0,
          height: 0
        }
        console.log(JSON.stringify(conditions))
        lanes[freeLane] = action.activity_number
        currentOpenConditions++
        setMaxOpenConditions(Math.max(maxOpenConditions, currentOpenConditions))
        activities[index].condition = {...conditions[action.activity_number], beamRef: conditions[action.activity_number].startRef}
      } else if(action.action_name === "CONDITION_END") {
        const laneIndex = lanes.findIndex((element) => element === action.activity_number)
        lanes[laneIndex] = undefined
        currentOpenConditions--
        activities[index].condition = {...conditions[action.activity_number], beamRef: conditions[action.activity_number].endRef}
      }
    })
    setConditions(conditions)
    setActivities(activities)
  }

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

  const updateConditionBeams = (height= stepsHeight) => {
    setStepsHeight(height)
    console.log('updateConditionBeams ')
    for (const [key, value] of Object.entries(conditions)) {
      if(value.startRef.current) {
        value.startY = value.startRef.current.offsetTop
        value.height = value.endRef.current.offsetTop - value.startRef.current.offsetTop
      }
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
              <Measure bounds onResize={contentRect => {
                console.log('resize')
                updateConditionBeams(contentRect.bounds.height)
              }}>
                {({ measureRef }) => (
                  <div ref={measureRef} className='procedure-card__details-container'>
                    {activities.map(activity => (
                      <Activity
                        key={activity.action.id}
                        activity={activity}
                        processStep={processStep}
                        maxOpenConditions={maxOpenConditions}
                      />
                    ))}
                  </div>
                )}
              </Measure>
              <ActivityCreator processStep={processStep} />
              <ConditionBeamsImage width={maxOpenConditions * 20} height={stepsHeight} beamsObject={conditions}/>
            </ProcedureCard.Details>
          }
        </ColumnContainerCard>
      </div>
    </div>
  );
};

export default StepColumCard;
