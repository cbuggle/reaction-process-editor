import React, { useEffect } from 'react';
import ActivityCard from "./ActivityCard";

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';
import ActivityCreator from "./ActivityCreator";

const Activity = ({ activity, processStep, maxOpenConditions }) => {
  const condition = activity.condition
  const api = useReactionsFetcher()

  const onSave = (actionForm) => {
    api.updateAction(actionForm)
  }

  const isInDropRange = (dropAction) => {
    return dropAction.min_position <= activity.position &&
      dropAction.max_position >= activity.position
  }

  const isBefore = (dropAction) => {
    return activity.position < dropAction.source_position
  }

  const isAfter = (dropAction) => {
    return activity.position > dropAction.source_position
  }

  const isInSameStep = (dropAction) => {
    return activity.step_id === dropAction.step_id
  }

  /* React-DnD drag source and drop target */
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: DndItemTypes.ACTION,
    item: {
      action: activity,
      source_position: activity.position,
      min_position: activity.min_position,
      max_position: activity.max_position,
      step_id: activity.step_id
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
    canDrag: () => !processStep.locked,
  }), [processStep])

  const [{ isOverBefore, isOverAfter }, dropRef] = useDrop(() => ({
    accept: DndItemTypes.ACTION,
    drop: (monitor) => dropItem(monitor),
    canDrop: (dropAction) => !processStep.locked && isInSameStep(dropAction) && isInDropRange(dropAction),
    collect: (monitor) => ({
      isOverBefore: monitor.isOver() && monitor.canDrop() && isBefore(monitor.getItem()),
      isOverAfter: monitor.isOver() && monitor.canDrop() && isAfter(monitor.getItem())
    }),
  }), [processStep])

  const dropItem = (monitor) => {
    if (activity.id !== monitor.action.id) {
      api.updateActionPosition(monitor.action.id, activity.position)
    }
  }

  const renderActivity = () => {
    const type = activity.action_name === 'CONDITION' ? 'condition' : 'action'
    return (
      <ActivityCard
        activity={activity}
        type={type}
        onSave={onSave}
        processStep={processStep}
        dragRef={dragRef}
      />
    )
  }

  return (
    <div className='activity'>
      <div ref={dropRef}>
        <div className={'bg-action'} style={isOverBefore ? { 'height': '1rem' } : {}}></div>
        <div ref={previewRef} style={isDragging ? { cursor: 'move', opacity: 0.2 } : { cursor: 'grab' }}>
          {renderActivity()}
        </div>
        <div className={'bg-action'} style={isOverAfter ? { 'height': '1rem' } : {}}></div>
      </div>
    </div>
  )
};

export default Activity;
