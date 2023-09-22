import React, { useState, useEffect } from 'react';

import ActionForm from "./forms/ActionForm";
import ActivityDecorator from '../../decorators/ActivityDecorator';
import ActivityInfo from "./ActivityInfo";
import ConditionForm from "./forms/ConditionForm";
import ProcedureCard from "../utilities/ProcedureCard";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";

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
  const uninitialisedForm = isCondition ? { action_name: "CONDITION", workup: workup } : undefined
  const uninitialisedMode = isCondition ? 'form' : 'type-panel'
  const uninitialisedTitle = isCondition ? 'Change Condition' : 'New Action'
  const [activityForm, setActivityForm] = useState(isInitialised ? activity : uninitialisedForm)
  const [displayMode, setDisplayMode] = useState(isInitialised ? 'info' : uninitialisedMode)
  const [openSubFormLabel, setOpenSubFormLabel] = useState(undefined)

  const cardTitle =
    (activityForm && !!activityForm.action_name) ?
      ActivityDecorator.title(activityForm.action_name, workup)
      :
      uninitialisedTitle

  const editable = displayMode !== 'info'

  useEffect(() => {
    setActivityForm(prevState => ({ ...prevState, workup: workup }));
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

  const handleToggleSubform = (openSubformLabel) => {
    setOpenSubFormLabel(openSubformLabel)
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
        <ActivityInfo action={activity} equipmentOptions={processStep.equipment_options} />
      </ProcedureCard.Info>
      <ProcedureCard.TypePanel>
        <TypeSelectionPanel onSelect={onSelectType} />
      </ProcedureCard.TypePanel>
      <ProcedureCard.Form>
        {activityForm && !isCondition &&
          <ActionForm
            activity={activityForm}
            processStep={processStep}
            openSubFormLabel={openSubFormLabel}
            onCancel={handleCancel}
            onSave={onSaveForm}
            onWorkupChange={onWorkupChange}
            setDuration={setDuration}
            onToggleSubform={handleToggleSubform}
          />
        }
        {isCondition &&
          <ConditionForm
            activity={activityForm}
            processStep={processStep}
            preConditions={preConditions}
            openSubFormLabel={openSubFormLabel}
            onCancel={handleCancel}
            onSave={onSaveForm}
            onWorkupChange={onWorkupChange}
            onToggleSubform={handleToggleSubform}
          />
        }
      </ProcedureCard.Form>
    </ProcedureCard>
  );
};

export default ActivityCard;
