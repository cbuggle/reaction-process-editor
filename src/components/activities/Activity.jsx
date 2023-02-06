import React, {useEffect} from 'react';
import ActivityCard from "./ActivityCard";
import ConditionFooter from "./ConditionFooter";

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';
import ActivityCreator from "./ActivityCreator";

const Activity = ({activity, processStep, maxOpenConditions}) => {
  const action = activity.action
  const condition = activity.condition
  const api = useReactionsFetcher()

  const onSave = (actionForm) => {
    api.updateAction(actionForm)
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

  const isInSameStep = (dropAction) => {
    return action.step_id === dropAction.step_id
  }

  /* React-DnD drag source and drop target */
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: DndItemTypes.ACTION,
    item: {
      action: action,
      source_position: action.position,
      min_position: action.min_position,
      max_position: action.max_position,
      step_id: action.step_id
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
    if (action.id !== monitor.action.id) {
      api.updateActionPosition(monitor.action.id, action.position)
    }
  }

  const getCustomClass = () => {
    if (action.action_name === "CONDITION" || action.action_name === "CONDITION_END") {
      return condition.customClass
    } else {
      return ''
    }
  }

  const getCardWidth = () => {
    if (action.action_name === "CONDITION" || action.action_name === "CONDITION_END") {
      const level = maxOpenConditions - condition.level
      return (374 + level * 16) + 'px'
    } else {
      return 'inherit'
    }
  }

  const renderActivity = () => {
    if (action.action_name === "CONDITION_END") {
      return (
        <ConditionFooter
          activity={action}
          cardWidth={getCardWidth()}
          customClass={getCustomClass()}
          dragRef={dragRef}
        />
      )
    } else {
      const type = action.action_name === 'CONDITION' ? 'condition' : 'action'
      return (
        <ActivityCard
          activity={action}
          type={type}
          onSave={onSave}
          processStep={processStep}
          customClass={getCustomClass()}
          cardWidth={getCardWidth()}
          dragRef={dragRef}
        />
      )
    }
  }

  return (
    <div className='activity'>
      {
        action.action_name === "CONDITION_END" ? <ActivityCreator processStep={processStep} insertNewBeforeIndex={action.position} /> : <></>
      }
      <div ref={dropRef}>
        <div className={'bg-action'} style={isOverBefore ? { 'height': '1rem' } : {}}></div>
        <div ref={previewRef} style={isDragging ? { cursor: 'move', opacity: 0.2 } : { cursor: 'grab' }}>
          <div ref={condition.beamRef}>
            {renderActivity()}
          </div>
        </div>
        <div className={'bg-action'} style={isOverAfter ? { 'height': '1rem' } : {}}></div>
      </div>
    </div>
  )
};

export default Activity;
