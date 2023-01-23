import React, { useState } from 'react';
import ActivityCard from "./ActivityCard";
import ConditionFooter from "./ConditionFooter";

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';
import ActivityCreator from "./ActivityCreator";

const Activity = ({ action, processStep, onChange }) => {

  const api = useReactionsFetcher()

  const onSave = (actionForm) => {
    api.updateAction(actionForm).then(() => {
      onChange()
    })
  }
  const isInDropRange = (dropAction) => {
    return dropAction.min_position <= action.position &&
      dropAction.max_position >= action.position
  }

  const isBefore = (dropAction) => {
    return action.position < dropAction.source_position
  }

  const isAfter = (dropAction) => {
    return action.position > dropAction.source_position
  }

  /* React-DnD drag source and drop target */
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: DndItemTypes.ACTION,
    item: {
      action: action,
      source_position: action.position,
      min_position: action.min_position,
      max_position: action.max_position
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
    canDrop: (dropAction) => !processStep.locked && isInDropRange(dropAction),
    collect: (monitor) => ({
      isOverBefore: monitor.isOver() && monitor.canDrop() && isBefore(monitor.getItem()),
      isOverAfter: monitor.isOver() && monitor.canDrop() && isAfter(monitor.getItem())
    }),
  }), [processStep])

  const dropItem = (monitor) => {
    if (action.id !== monitor.action.id) {
      api.updateActionPosition(monitor.action.id, action.position).then(() => {
        onChange()
      })
    }
  }

  const renderActivity = () => {
    if (action.action_name === "CONDITION_END") {
      return (
        <ConditionFooter activity={action} dragRef={dragRef} />
      )
    } else {
      const type = action.action_name === 'CONDITION' ? 'condition' : 'action'
      return (
        <ActivityCard
          activity={action}
          type={type}
          onSave={onSave}
          onChange={onChange}
          processStep={processStep}
          dragRef={dragRef}
        />
      )
    }
  }

  return (
    <>
      {
        action.action_name === "CONDITION_END" ? <ActivityCreator processStep={processStep} onChange={onChange} insertNewBeforeIndex={action.position} /> : <></>
      }

      <div ref={dropRef} >
        <div className={'bg-action'} style={isOverBefore ? { 'height': '1rem' } : {}}></div>
        <div ref={previewRef} style={isDragging ? { cursor: 'move', opacity: 0.2 } : { cursor: 'grab' }}>
          {renderActivity()}
        </div>
        <div className={'bg-action'} style={isOverAfter ? { 'height': '1rem' } : {}}></div>
      </div>
    </>
  )
};

export default Activity;
