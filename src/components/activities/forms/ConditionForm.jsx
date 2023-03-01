import React, {useState} from 'react'
import { conditionTypes } from "../../../constants/conditionTypes";
import ActivityForm from "./ActivityForm";
import ConditionTypeFormGroup from "./ConditionTypeFormGroup";

const ConditionForm = (
  {
    activity,
    previousConditions,
    onSave,
    onCancel,
    onWorkupChange
  }) => {

  const [conditionWorkup, setConditionWorkup] = useState({})
  const formDimensions = conditionTypes
  const saveConditionType = (typeName, condition) => {
    const workupUpdate = {...conditionWorkup}
    workupUpdate[typeName] = condition
    setConditionWorkup(workupUpdate)
  }

  const applyConditionWorkUp = () => {
    for (const [key, value] of Object.entries(conditionWorkup)) {
      onWorkupChange({
        name: key,
        value: value
      })
    }
    onSave()
  }

  return (
    <ActivityForm
      type='condition'
      activity={activity}
      onSave={applyConditionWorkUp}
      onCancel={onCancel}
    >
      {
        formDimensions.map(type => (
          <ConditionTypeFormGroup
            key={type.action.workup.condition_type}
            type={type}
            previousCondition={previousConditions[type.action.workup.condition_type]}
            workup={activity.workup}
            onSave={saveConditionType}
          />
        ))
      }
    </ActivityForm>
  )
}

export default ConditionForm
