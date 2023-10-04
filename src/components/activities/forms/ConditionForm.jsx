import React, { useState } from 'react'

import ActivityForm from "./ActivityForm";
import ConditionTypeFormGroup from "./ConditionTypeFormGroup";

import { conditionFormTypeNames } from "../../../constants/conditionTypes.jsx";

const ConditionForm = (
  {
    activity,
    conditionEquipmentOptions,
    preConditions,
    openSubFormLabel,
    onSave,
    onCancel,
    onWorkupChange,
    onChangeDuration,
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
      onChangeDuration={onChangeDuration}
      onToggleSubform={onToggleSubform}
      className={focus ? 'condition-form--focus' : ''}
    >
      {
        conditionFormTypeNames.map((conditionTypeName) => (
          <ConditionTypeFormGroup
            key={conditionTypeName}
            conditionTypeName={conditionTypeName}
            equipmentOptions={conditionEquipmentOptions[conditionTypeName]}
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
