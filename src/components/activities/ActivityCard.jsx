import React, { useContext, useEffect, useState } from 'react';

import ActionForm from "./forms/actions/ActionForm";
import ActivityInfoDecorator from '../../decorators/ActivityInfoDecorator';
import ActivityInfo from "./ActivityInfo";
import ConditionForm from "./forms/conditions/ConditionForm";
import ProcedureCard from "../utilities/ProcedureCard";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";
import Timer from './timing/Timer';

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";
import { SubFormController } from '../../contexts/SubFormController';
import { StepLock } from '../../contexts/StepLock';
import ActivityValidator from '../../validators/ActivityValidator';

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
  const subFormController = useContext(SubFormController)
  const stepLock = useContext(StepLock)

  const isCondition = type === 'condition'
  const isInitialised = !!activity
  const [workup, setWorkup] = useState(isInitialised ? activity.workup : {});
  const uninitialisedForm = isCondition ? { activity_name: "CONDITION", workup: workup } : undefined
  const uninitialisedMode = isCondition ? 'form' : 'type-panel'
  const uninitialisedTitle = isCondition ? 'Change Condition' : 'New Action'
  const [activityForm, setActivityForm] = useState(isInitialised ? activity : uninitialisedForm)
  const [displayMode, setDisplayMode] = useState(isInitialised ? 'info' : uninitialisedMode)

  const cardTitle = !!activityForm?.activity_name ? ActivityInfoDecorator.cardTitle(activityForm) : uninitialisedTitle

  const editable = displayMode === 'info' && !stepLock
  const canceable = displayMode !== 'info' && !stepLock

  useEffect(() => {
    setActivityForm(prevState => ({ ...prevState, workup: workup }));
  }, [workup, subFormController, subFormController.openSubFormLabel, displayMode]);

  const edit = () => setDisplayMode(isInitialised ? 'form' : uninitialisedMode())

  const onDelete = () => api.deleteActivity(activity.id)

  const onSelectType = (newActivity) => () => {
    setActivityForm(newActivity)
    setWorkup(newActivity.workup)
    setDisplayMode('form')
  }

  const onSaveForm = () => {
    if (ActivityValidator.validate(activityForm)) {
      onSave(activityForm)
      subFormController.closeAllSubForms()
      if (isInitialised) {
        setDisplayMode('info')
      } else {
        setActivityForm({ workup: {} })
      }
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

  const handleWorkupChange = ({ name, value }) => {
    setWorkup(prevWorkup => ({ ...prevWorkup, [name]: value }))
  }

  const setDuration = (value) => handleWorkupChange({ name: "duration", value: value })

  return (
    <ProcedureCard
      title={cardTitle}
      type={type}
      onEdit={edit}
      onDelete={onDelete}
      onCancel={handleCancel}
      showEditBtn={editable}
      showMoveXBtn={false}
      showMoveYBtn={editable}
      showDeleteBtn={editable}
      showCancelBtn={canceable}
      displayMode={displayMode}
      headerTitleTag='h6'
      customClass={customClass}
      dragRef={dragRef}
    >
      <ProcedureCard.Info>
        <>
          <ActivityInfo
            activity={activity}
            preconditions={preconditions}
          />
          <Timer
            activityType={type}
            workup={activityForm?.workup}
            onSave={onSaveForm}
            onWorkupChange={handleWorkupChange}
            onChangeDuration={setDuration}
            displayMode='info'
          />
        </>
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
  );
};

export default ActivityCard;
