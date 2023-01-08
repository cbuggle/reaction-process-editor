import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, UncontrolledTooltip } from "reactstrap";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import ActionInfo from './ActionInfo';
import ActionForm from './ActionForm';
import ActionCard from './ActionCard';

import CreateButton from '../utilities/CreateButton';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

import { actionTypeClusters } from '../../constants/actionTypeClusters';

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
    console.log("actionForm")
    console.log(actionForm)

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
  const cardTitle = actionForm.id ?
    '' + (action.position + 1) + ' ' + actionForm.action_name + ' ' + actionForm.workup['description']
    :
    'New Action ' + actionForm.action_name + ' ' + (actionForm.workup['acts_as'] || '')

  const renderActionCard = () => {
    return (
      <ActionCard title={cardTitle} onEdit={openForm} onDelete={onDelete} showForm={showForm} >
        {showForm ? <ActionForm action={actionForm} onCancel={onCancel} onSave={onSave} onWorkupChange={onWorkupChange} setDuration={setDuration} processStep={processStep} /> :
          <ActionInfo action={action} />}
      </ActionCard>
    )
  }

  const renderActionTypeSelectForm = () => {
    return (
      showForm ?
        <ActionCard title={"New Action"} showForm={true} onDelete={onCancel}>
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
