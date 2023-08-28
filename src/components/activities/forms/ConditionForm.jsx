import React, { useState } from 'react'
import { conditionTypes } from "../../../constants/conditionTypes";
import ActivityForm from "./ActivityForm";
import ConditionTypeFormGroup from "./ConditionTypeFormGroup";

const ConditionForm = (
  {
    activity,
    processStep,
    preConditions,
    onSave,
    onCancel,
    onWorkupChange
  }) => {

  const [focus, setFocus] = useState(false);
  const formDimensions = conditionTypes
  const toggleFocus = () => {
    setFocus(!focus)
  }

  return (
    <ActivityForm
      type='condition'
      activity={activity}
      onSave={onSave}
      onCancel={onCancel}
      onWorkupChange={onWorkupChange}
      className={focus ? 'condition-form--focus' : ''}
    >
      {
        formDimensions.map(type => (
          <ConditionTypeFormGroup
            key={type.action.workup.condition_type}
            type={type}
            processStep={processStep}
            preCondition={preConditions[type.action.workup.condition_type]}
            workup={activity.workup}
            onWorkupChange={onWorkupChange}
            onToggleFocus={toggleFocus}
          />
        ))
      }
    </ActivityForm>
  )
}

export default ConditionForm
