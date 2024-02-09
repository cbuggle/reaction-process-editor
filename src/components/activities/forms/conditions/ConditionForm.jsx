import React from 'react'

import ActivityForm from "../ActivityForm";
import MetricFormGroup from "./MetricFormGroup";

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
          <MetricFormGroup
            key={metricName}
            metricName={metricName}
            precondition={preconditions[metricName]}
            workup={activity.workup}
            onWorkupChange={onWorkupChange}
          />)
        )
      }
    </ActivityForm >
  )
}

export default ConditionForm
