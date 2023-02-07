import React, { useState } from 'react';

import ProcedureCard from "../utilities/ProcedureCard";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import ActivityInfo from "./ActivityInfo";
import ActivityForm from "./ActivityForm";
import ActivityDecorator from '../../decorators/ActivityDecorator';
import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const ActivityCard = (
  {
    type,
    activity,
    onSave,
    onCancel,
    processStep,
    cardWidth,
    customClass,
    dragRef,
  }) => {

  const api = useReactionsFetcher()
  const isInitialised = !!activity
  const [activityForm, setActivityForm] = useState(activity)
  const [displayMode, setDisplayMode] = useState(isInitialised ? 'info' : 'type-panel')
  const editable = displayMode !== 'info'

  const cardTitle = () => {
    if (isInitialised) {
      return ActivityDecorator.title(activity)
    } else {
      let label = 'New ' + type.charAt(0).toUpperCase() + type.slice(1);

      if (activityForm) {
        let acts_as_label = activityForm.workup.acts_as || ''

        if (acts_as_label === 'DIVERSE_SOLVENT') {
          acts_as_label = 'SOLVENT'
        }

        activityForm.action_name === "CONDITION" ?
          label += ' ' + (activityForm.workup['condition_type'] || '')
          :
          label += ' ' + activityForm.action_name + ' ' + acts_as_label
      }
      return label
    }
  }

  const edit = () => {
    setDisplayMode(isInitialised ? 'form' : 'type-panel')
  }

  const onDelete = () => {
    api.deleteAction(activity.id)
  }

  const handleCancel = () => {
    if (isInitialised) {
      setActivityForm(activity)
      setDisplayMode('info')
    } else {
      onCancel()
    }
  }

  const onSelectType = (activity) => () => {
    setActivityForm(activity)
    setDisplayMode('form')
  }

  const onSaveForm = () => {
    onSave(activityForm)
    if (isInitialised) {
      setDisplayMode('info')
    } else {
      setActivityForm({ workup: {} })
    }
  }

  const onWorkupChange = (field) => {
    const { name, value } = field;
    setActivityForm(prevState => ({
      ...prevState, workup: { ...prevState.workup, [name]: value }
    }));
  }


  const setDuration = (value) => {
    setActivityForm({ name: "duration", value: value })
    onWorkupChange({ name: "duration", value: value })
  }

  return (
    <ProcedureCard
      title={cardTitle()}
      type={type}
      onEdit={edit}
      onDelete={onDelete}
      onCancel={handleCancel}
      showEditBtn={!editable}
      showMoveXBtn={false}
      showMoveYBtn={!editable}
      showDeleteBtn={!editable}
      showCancelBtn={editable}
      displayMode={displayMode}
      cardWidth={cardWidth}
      headerTitleTag='h6'
      customClass={customClass}
      dragRef={dragRef}
    >
      <ProcedureCard.Info>
        <ActivityInfo action={activity} />
      </ProcedureCard.Info>
      <ProcedureCard.TypePanel>
        <TypeSelectionPanel onSelect={onSelectType} selectionType={type} />
      </ProcedureCard.TypePanel>
      <ProcedureCard.Form>
        {activityForm &&
          <ActivityForm
            action={activityForm}
            onCancel={handleCancel}
            onSave={onSaveForm}
            onWorkupChange={onWorkupChange}
            setDuration={setDuration}
            processStep={processStep}
          />
        }
      </ProcedureCard.Form>
    </ProcedureCard>
  );
};

export default ActivityCard;
