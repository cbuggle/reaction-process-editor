import React from 'react'

import ActivityForm from "../ActivityForm";
import MetricsFormGroup from "./MetricsFormGroup";

import { conditionFormMetricNames } from "../../../../constants/metrics.jsx";

const ConditionForm = (
  {
    activity,
    preconditions,
    onSave,
    onCancel,
    onWorkupChange,
    onChangeDuration,
  }) => {

  return (
    <ActivityForm
      type='condition'
      activity={activity}
      onSave={onSave}
      onCancel={onCancel}
      onWorkupChange={onWorkupChange}
      onChangeDuration={onChangeDuration}
          >
      {
        conditionFormMetricNames.map((metricName) => (
          <MetricsFormGroup
            key={metricName}
            metricName={metricName}
            preCondition={preconditions[metricName]}
            workup={activity.workup}
            onWorkupChange={onWorkupChange}
                      />)
        )
      }
    </ActivityForm >
  )
}

export default ConditionForm
