import ActivityCard from "./ActivityCard";
import InsertZone from "./InsertZone";

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';

const Activity = ({ activity, processStep }) => {
  const api = useReactionsFetcher()

  const onSave = (actionForm) => {
    api.updateAction(actionForm)
  }

  const isInSameStep = (dropAction) => {
    return activity.step_id === dropAction.step_id
  }

  const dropClassName = () => {
    return canDrop && activity.position > getItem.source_position ?
      'activity--below-drag-position' : 'activity--above-drag-position'
  }

  /* React-DnD drag source and drop target */
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: DndItemTypes.ACTION,
    item: {
      activity: activity,
      source_position: activity.position,
      step_id: activity.step_id
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      canDrag: monitor.canDrag()
    }),
    canDrag: () => !processStep.locked,
  }), [processStep])

  /* dropClassName currently under development */
  const [{ isOver, getItem, canDrop }, dropRef] = useDrop(() => ({
    accept: DndItemTypes.ACTION,
    drop: (monitor) => dropItem(monitor),
    canDrop: (dropAction) => !processStep.locked && isInSameStep(dropAction),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver() && monitor.canDrop(),
      getItem: monitor.getItem()
    }),
  }), [processStep])

  const dropItem = (monitor) => {
    if (activity.id !== monitor.activity.id) {
      api.updateActionPosition(monitor.activity.id, activity.position)
    }
  }

  const renderActivity = () => {
    const type = activity.action_name === 'CONDITION' ? 'condition' : 'action'
    return (
      <ActivityCard
        activity={activity}
        type={type}
        onSave={onSave}
        previousConditions={activity.current_conditions}
        processStep={processStep}
        dragRef={dragRef}
      />
    )
  }

  const insertZoneState = () => {
    let state = 'default'
    if (isDragging) {
      state = 'inactive'
    } else if (isOver) {
      state = 'target'
    }
    return state
  }

  return (
    <div ref={dropRef} className={'activity ' + dropClassName()}>
      <InsertZone
        state={insertZoneState()}
        processStep={processStep}
        previousConditions={activity.current_conditions}
        insertNewBeforeIndex={activity.position}
      />
      <div ref={previewRef} style={isDragging ? { cursor: 'move', opacity: 0.2 } : {}}>
        {renderActivity()}
      </div>
    </div>
  )
};

export default Activity;
