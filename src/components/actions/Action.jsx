import React, { useState } from 'react';
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import ActionInfo from './ActionInfo';
import ActionForm from './ActionForm';
import ActionCard from './ActionCard';

import CreateButton from '../utilities/CreateButton';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

import { actionTypeClusters } from '../../constants/actionTypeClusters';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';

const Action = ({ action, processStep, onChange }) => {

  const api = useReactionsFetcher()

  const [actionForm, setActionForm] = useState(action)
  const [showForm, setShowForm] = useState(false)

  const onWorkupChange = (field) => {
    const { name, value } = field;
    setActionForm(prevState => ({
      ...prevState, workup: { ...prevState.workup, [name]: value }
    }));
  }

  const onCancel = () => {
    setActionForm(action)
    setShowForm(false)
  }

  const onSave = () => {
    if (actionForm.id) {
      api.updateAction(actionForm).then(() => {
        setShowForm(false)
        onChange()
      })
    } else {
      api.createAction(processStep.id, actionForm).then(() => {
        setShowForm(false)
        setActionForm({ workup: {} })
        onChange()
      })
    }
  }

  const onDelete = () => {
    api.deleteAction(action.id).then(() => {
      onChange()
    })
  }

  const setDuration = (value) => {
    setActionForm({ name: "duration", value: value })
    onWorkupChange({ name: "duration", value: value })
  }

  const openForm = () => {
    setShowForm(true)
  }

  const onSelectType = (action) => () => {
    setActionForm(action)
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

  const [{ isOverBefore, isOverAfter }, dropRef] = useDrop(() => ({
    accept: DndItemTypes.ACTION,
    drop: (monitor) => dropItem(monitor),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverBefore: monitor.isOver() && monitor.getItem().action.position > action.position,
      isOverAfter: monitor.isOver() && monitor.getItem().action.position < action.position
    }),
    canDrop: () => !processStep.locked
  }), [processStep])

  const dropItem = (monitor) => {
    console.log("monitor")
    console.log(monitor)
    console.log(action)
    if (action.id !== monitor.action.id) {
      api.updateActionPosition(monitor.action.id, action.position).then(() => {
        onChange()
      })
    }
  }

  const newActionTitle = 'New Action ' + actionForm.action_name + ' ' + (actionForm.workup['acts_as'] || '')

  const cardTitle = actionForm.id ? action.label : newActionTitle

  const renderActionCard = () => {
    return (
      <div ref={dropRef} >
        <div className={'bg-action'} style={isOverBefore ? { 'height': '1rem' } : {}}></div>
        <div ref={previewRef} style={isDragging ? { cursor: 'move', opacity: 0.2, 'height': '2rem' } : { cursor: 'grab' }}>
          <ActionCard title={cardTitle} onEdit={openForm} onDelete={onDelete} showForm={showForm} dragRef={dragRef} >
            {showForm ? <ActionForm action={actionForm} onCancel={onCancel} onSave={onSave} onWorkupChange={onWorkupChange} setDuration={setDuration} processStep={processStep} /> :
              <ActionInfo action={action} />}
          </ActionCard>
        </div>
        <div className={'bg-action'} style={isOverAfter ? { 'height': '1rem' } : {}}></div>
      </div>
    )
  }

  const renderActionTypeSelectForm = () => {
    return (
      showForm ?
        <ActionCard title={"New Action"} showForm={true} onCancel={onCancel}>
          <TypeSelectionPanel clusters={actionTypeClusters} onSelect={onSelectType} />
        </ActionCard >
        : <CreateButton label='New Action' type='action' onClick={openForm} />
    )
  }

  return (
    actionForm.action_name ? renderActionCard() : renderActionTypeSelectForm()
  )
};

export default Action;
