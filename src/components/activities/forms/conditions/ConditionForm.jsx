import React from 'react'

import ActivityForm from "../ActivityForm";
import MetricsFormGroup from "./MetricsFormGroup";

import { conditionFormMetricNames } from "../../../../constants/metrics.jsx";

const ConditionForm = (
  {
    activity,
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
        conditionFormMetricNames.map((metricName) => (
          <MetricsFormGroup
            key={metricName}
            metricName={metricName}
            preCondition={preconditions[metricName]}
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
