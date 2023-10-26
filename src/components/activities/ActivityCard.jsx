import React, { useEffect, useState } from 'react';

import ActionForm from "./forms/actions/ActionForm";
import ActivityDecorator from '../../decorators/ActivityDecorator';
import ActivityInfo from "./ActivityInfo";
import ConditionForm from "./forms/conditions/ConditionForm";
import ProcedureCard from "../utilities/ProcedureCard";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

import { SubFormController, SubFormToggle } from '../../contexts/SubFormController';

const ActivityCard = (
  {
    type,
    activity,
    onSave,
    onCancel,
    preconditions,
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

  const cardTitle = !!activityForm?.action_name ? ActivityDecorator.cardTitle(activityForm) : uninitialisedTitle

  const editable = displayMode !== 'info'

  useEffect(() => {
    setActivityForm(prevState => ({ ...prevState, workup: workup }));
  }, [workup]);

  const edit = () => setDisplayMode(isInitialised ? 'form' : uninitialisedMode())

  const onDelete = () => api.deleteAction(activity.id)

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
  const handleCancel = () => {
    if (isInitialised) {
      setActivityForm(activity)
      setDisplayMode('info')
    } else {
      onCancel()
    }
  }

  const handleWorkupChange = ({ name, value }) => setWorkup(prevWorkup => ({ ...prevWorkup, [name]: value }))

  const setDuration = (value) => handleWorkupChange({ name: "duration", value: value })

  return (
    <SubFormController.Provider value={SubFormToggle()}>
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
          <ActivityInfo
            action={activity}
            preconditions={preconditions}
          />
        </ProcedureCard.Info>
        <ProcedureCard.TypePanel>
          <TypeSelectionPanel onSelect={onSelectType} />
        </ProcedureCard.TypePanel>
        <ProcedureCard.Form>
          {activityForm && !isCondition &&
            <ActionForm
              activity={activityForm}
              preconditions={preconditions}
              processStep={processStep}
              onCancel={handleCancel}
              onSave={onSaveForm}
              onWorkupChange={handleWorkupChange}
              onChangeDuration={setDuration}
            />
          }
          {isCondition &&
            <ConditionForm
              activity={activityForm}
              preconditions={preconditions}
              onCancel={handleCancel}
              onSave={onSaveForm}
              onWorkupChange={handleWorkupChange}
              onChangeDuration={setDuration}
            />
          }
        </ProcedureCard.Form>
      </ProcedureCard>
    </SubFormController.Provider>
  );
};

export default ActivityCard;
