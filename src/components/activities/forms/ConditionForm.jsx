import React, {useState} from 'react'
import { conditionTypes } from "../../../constants/conditionTypes";
import ActivityForm from "./ActivityForm";
import ConditionTypeFormGroup from "./ConditionTypeFormGroup";

const ConditionForm = (
  {
    activity,
    preConditions,
    onSave,
    onCancel,
    onWorkupChange
  }) => {

  const formDimensions = conditionTypes

  return (
    <ActivityForm
      type='condition'
      activity={activity}
      onSave={onSave}
      onCancel={onCancel}
      onWorkupChange={onWorkupChange}
    >
      {
        formDimensions.map(type => (
          <ConditionTypeFormGroup
            key={type.action.workup.condition_type}
            type={type}
            preCondition={preConditions[type.action.workup.condition_type]}
            workup={activity.workup}
            onWorkupChange={onWorkupChange}
          />
        ))
      }
    </ActivityForm>
  )
}

export default ConditionForm
