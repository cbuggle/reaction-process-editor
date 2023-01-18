import React, { useState } from 'react';
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import ActionInfo from './ActionInfo';
import ActionForm from './ActionForm';
import ActionCard from './ActionCard';
import ConditionCard from '../conditions/ConditionCard';
import ConditionEndCard from '../conditions/ConditionEndCard';

import CreateButton from '../utilities/CreateButton';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

import { actionTypeClusters } from '../../constants/actionTypeClusters';
import { conditionTypeClusters } from '../../constants/conditionTypeClusters';

import { useDrag, useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';

const Action = ({ action, processStep, onChange, inserCreatedBeforePosition }) => {

  const api = useReactionsFetcher()

  const [actionForm, setActionForm] = useState(action)
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState('action')

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
      api.createAction(processStep.id, actionForm, inserCreatedBeforePosition).then(() => {
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

  const openActionForm = () => {
    setFormType('action')
    openForm()
  }

  const openConditionForm = () => {
    setFormType('condition')
    openForm()
  }

  const renderTypeSelectForm = () => {
    return (
      showForm ?
        formType == 'action' ?
          <ActionCard title={"New Action"} showForm={true} onCancel={onCancel}>
            <TypeSelectionPanel clusters={actionTypeClusters} onSelect={onSelectType} selectionType={formType} />
          </ActionCard >
          :
          <ConditionCard title={"New Condition"} showForm={true} onCancel={onCancel}>
            <TypeSelectionPanel clusters={conditionTypeClusters} onSelect={onSelectType} selectionType={formType} />
          </ConditionCard >
        :
        <div className="d-grid gap-2 d-md-flex">
          <CreateButton label='New Action' type='action' onClick={openActionForm} />
          <CreateButton label='New Condition' type='condition' onClick={openConditionForm} />
        </div>
    )
  }

  const renderActionCard = () => {
    const newActionTitle = 'New Action ' + actionForm.action_name + ' ' + (actionForm.workup['acts_as'] || '')
    const cardTitle = actionForm.id ? action.label : newActionTitle

    switch (action.action_name) {
      case "CONDITION":
        return (
          <ConditionCard title={cardTitle} onEdit={openForm} onDelete={onDelete} onCancel={onCancel} showForm={showForm} dragRef={dragRef}  >
            {showForm ? <ActionForm action={actionForm} onCancel={onCancel} onSave={onSave} onWorkupChange={onWorkupChange} setDuration={setDuration} processStep={processStep} /> :
              <ActionInfo action={action} />}
          </ConditionCard>

        )
      case "CONDITION_END":
        return (
          <>
            <ConditionEndCard title={cardTitle} onEdit={openForm} onDelete={onDelete} onCancel={onCancel} showForm={showForm} dragRef={dragRef}  >
              <ActionInfo action={action} />
            </ConditionEndCard>

          </>
        )
      default:
        return (
          <ActionCard title={cardTitle} onEdit={openForm} onDelete={onDelete} onCancel={onCancel} showForm={showForm} dragRef={dragRef}  >
            {showForm ? <ActionForm action={actionForm} onCancel={onCancel} onSave={onSave} onWorkupChange={onWorkupChange} setDuration={setDuration} processStep={processStep} /> :
              <ActionInfo action={action} />}
          </ActionCard>
        )
    }
  }

  const renderActionCardDropWrapper = () => {
    return (
      <>
        {
          action.action_name === "CONDITION_END" ? <Action action={{ workup: {} }} processStep={processStep} onChange={onChange} inserCreatedBeforePosition={action.position} /> : <></>
        }

        <div ref={dropRef} >
          <div className={'bg-action'} style={isOverBefore ? { 'height': '1rem' } : {}}></div>
          <div ref={previewRef} style={isDragging ? { cursor: 'move', opacity: 0.2 } : { cursor: 'grab' }}>
            {renderActionCard()}
          </div>
          <div className={'bg-action'} style={isOverAfter ? { 'height': '1rem' } : {}}></div>
        </div>
      </>
    )
  }

  return (
    actionForm.action_name ? renderActionCardDropWrapper() : renderTypeSelectForm()
  )
};

export default Action;
