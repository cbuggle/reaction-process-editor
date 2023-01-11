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


  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: DndItemTypes.ACTION,
    drop: (monitor) => dropItem(monitor, action),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    canDrop: (monitor) => !processStep.locked
  }), [processStep])

  const dropItem = (monitor, action) => {
    console.log(monitor)
    console.log(action)
    api.updateActionPosition(monitor.action.id, action.position).then(() => {
      onChange()
    })
  }

  const newActionTitle = 'New Action ' + actionForm.action_name + ' ' + (actionForm.workup['acts_as'] || '')

  const cardTitle = actionForm.id ? action.label : newActionTitle

  const renderActionCard = () => {
    return (
      <div ref={dropRef} style={{ opacity: isOver ? 0.5 : 1 }}>
        <div ref={previewRef} style={{ opacity: isDragging ? 0 : 1, cursor: isDragging ? 'move' : 'grab' }}>
          <ActionCard title={cardTitle} onEdit={openForm} onDelete={onDelete} showForm={showForm} dragRef={dragRef} >
            {showForm ? <ActionForm action={actionForm} onCancel={onCancel} onSave={onSave} onWorkupChange={onWorkupChange} setDuration={setDuration} processStep={processStep} /> :
              <ActionInfo action={action} />}
          </ActionCard>
        </div>
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
