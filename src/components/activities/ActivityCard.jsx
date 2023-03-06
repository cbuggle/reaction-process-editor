import React, { useState } from 'react';

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
  const uninitialisedForm = isCondition ? {action_name: "CONDITION", workup: {}} : undefined
  const uninitialisedMode = isCondition ? 'form' : 'type-panel'
  const [activityForm, setActivityForm] = useState(isInitialised ? activity : uninitialisedForm)
  const [displayMode, setDisplayMode] = useState(isInitialised ? 'info' : uninitialisedMode)
  const editable = displayMode !== 'info'

  const cardTitle = () => {
    if (isInitialised) {
      return ActivityDecorator.title(activity)
    } else {
      let label = isCondition ? 'Change Condition' : 'New Action';

      if (activityForm && !isCondition) {
        let acts_as_label = activityForm.workup.acts_as || ''

        if (acts_as_label === 'DIVERSE_SOLVENT') {
          acts_as_label = 'SOLVENT'
        }
      }
      return label
    }
  }



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
            onCancel={handleCancel}
            onSave={onSaveForm}
            onWorkupChange={onWorkupChange}
            setDuration={setDuration}
            processStep={processStep}
          />
        }
        {isCondition &&
          <ConditionForm
            activity={activityForm}
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
