import React, { useState } from 'react'
import ActivityForm from "./ActivityForm";
import ConditionTypeFormGroup from "./ConditionTypeFormGroup";

import { conditionTypes, conditionFormTypeNames } from "../../../constants/conditionTypes";

const ConditionForm = (
  {
    activity,
    processStep,
    preConditions,
    openSubFormLabel,
    onSave,
    onCancel,
    onWorkupChange,
    onToggleSubform
  }) => {

  const [focus, setFocus] = useState(false);
  const toggleFocus = () => {
    setFocus(!focus)
  }

  return (
    <ActivityForm
      type='condition'
      activity={activity}
      openSubFormLabel={openSubFormLabel}
      onSave={onSave}
      onCancel={onCancel}
      onWorkupChange={onWorkupChange}
      onToggleSubform={onToggleSubform}
      className={focus ? 'condition-form--focus' : ''}
    >
      {
        conditionFormTypeNames.map((conditionTypeName) => (
          <ConditionTypeFormGroup
            key={conditionTypeName}
            conditionTypeName={conditionTypeName}
            conditionType={conditionTypes[conditionTypeName]}
            processStep={processStep}
            preCondition={preConditions[conditionTypeName]}
            workup={activity.workup}
            openSubFormLabel={openSubFormLabel}
            onWorkupChange={onWorkupChange}
            onToggleFocus={toggleFocus}
            onToggleSubform={onToggleSubform}
          />)
        )
      }
    </ActivityForm >
  )
}

export default ConditionForm
