import React, { useState, useEffect } from 'react';

import ProcedureCard from "../utilities/ProcedureCard";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import ActivityInfo from "./ActivityInfo";
import ConditionForm from "./forms/ConditionForm";
import ActionForm from "./forms/ActionForm";
import ActivityDecorator from '../../decorators/ActivityDecorator';
import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const ActivityCard = (
  {
    type,
    activity,
    onSave,
    onCancel,
    preConditions,
    processStep,
    customClass,
    dragRef,
  }) => {

  const api = useReactionsFetcher()
  const isCondition = type === 'condition'
  const isInitialised = !!activity
  const [workup, setWorkup] = useState(isInitialised ? activity.workup : {});
  const uninitialisedForm = isCondition ? {action_name: "CONDITION", workup: workup} : undefined
  const uninitialisedMode = isCondition ? 'form' : 'type-panel'
  const uninitialisedTitle = isCondition ? 'Change Condition' : 'New Action'
  const [activityForm, setActivityForm] = useState(isInitialised ? activity : uninitialisedForm)
  const [displayMode, setDisplayMode] = useState(isInitialised ? 'info' : uninitialisedMode)
  const generateTitle = () => {
    if (activityForm && activityForm.action_name) {
      return ActivityDecorator.title(activityForm.action_name, workup);
    } else {
      return uninitialisedTitle;
    }
  }
  const [cardTitle, setCardTitle] = useState(generateTitle());
  const editable = displayMode !== 'info'

  useEffect(() => {
    setActivityForm(prevState => ({...prevState, workup: workup}));
    setCardTitle(generateTitle());
  }, [workup]);

  const edit = () => {
    setDisplayMode(isInitialised ? 'form' : uninitialisedMode())
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

  const onSelectType = (newActivity) => () => {
    setActivityForm(newActivity)
    setWorkup(newActivity.workup)
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
    setWorkup(prevWorkup => ({ ...prevWorkup, [name]: value }));
  }


  const setDuration = (value) => {
    setActivityForm({ name: "duration", value: value })
    onWorkupChange({ name: "duration", value: value })
  }

  return (
    <ProcedureCard
      title={cardTitle}
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
      headerTitleTag='h6'
      customClass={customClass}
      dragRef={dragRef}
    >
      <ProcedureCard.Info>
        <ActivityInfo action={activity} />
      </ProcedureCard.Info>
      <ProcedureCard.TypePanel>
        <TypeSelectionPanel onSelect={onSelectType} />
      </ProcedureCard.TypePanel>
      <ProcedureCard.Form>
        {activityForm && !isCondition &&
          <ActionForm
            activity={activityForm}
            processStep={processStep}
            onCancel={handleCancel}
            onSave={onSaveForm}
            onWorkupChange={onWorkupChange}
            setDuration={setDuration}
          />
        }
        {isCondition &&
          <ConditionForm
            activity={activityForm}
            processStep={processStep}
            preConditions={preConditions}
            onCancel={handleCancel}
            onSave={onSaveForm}
            onWorkupChange={onWorkupChange}
          />
        }
      </ProcedureCard.Form>
    </ProcedureCard>
  );
};

export default ActivityCard;
