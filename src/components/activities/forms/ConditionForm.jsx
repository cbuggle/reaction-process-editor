import React from 'react'

import ActivityForm from "./ActivityForm";
import ConditionTypeFormGroup from "./conditions/ConditionTypeFormGroup";

import { conditionFormTypeNames } from "../../../constants/conditionTypes.jsx";

const ConditionForm = (
  {
    activity,
    conditionTypesEquipmentOptions,
    preconditions,
    openSubFormLabel,
    onSave,
    onCancel,
    onWorkupChange,
    onChangeDuration,
    onToggleSubform
  }) => {

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
    >
      {
        conditionFormTypeNames.map((conditionTypeName) => (
          <ConditionTypeFormGroup
            key={conditionTypeName}
            conditionTypeName={conditionTypeName}
            equipmentOptions={conditionTypesEquipmentOptions[conditionTypeName]}
            preCondition={preconditions[conditionTypeName]}
            workup={activity.workup}
            openSubFormLabel={openSubFormLabel}
            onWorkupChange={onWorkupChange}
            onToggleSubform={onToggleSubform}
          />)
        )
      }
    </ActivityForm >
  )
}

export default ConditionForm
