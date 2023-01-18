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

  /* React-DnD drag source and drop target */
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: DndItemTypes.ACTION,
    item: { action: action },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      canDrag: monitor.canDrag()
    }),
    canDrag: () => !processStep.locked
  }), [processStep])

  const [{ isOver, isOverBefore, isOverAfter }, dropRef] = useDrop(() => ({
    accept: DndItemTypes.ACTION,
    drop: (monitor) => dropItem(monitor),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isOverBefore: monitor.isOver() && monitor.getItem().action.position > action.position,
      isOverAfter: monitor.isOver() && monitor.getItem().action.position < action.position
    }),
    canDrop: () => !processStep.locked
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
