import TimeDecorator from "../../../decorators/TimeDecorator";
import OptionalFormSet from "./OptionalFormSet";
import React, {useState} from "react";
import DurationSelection from "../../utilities/DurationSelection";

const TimingFormSet = (
  {
    activityType,
    activity,
    openSubFormLabel,
    onToggleSubform,
    onChangeDuration
  }) => {
  const [duration, setDuration] = useState(!!activity.workup.duration ? activity.workup.duration : 0)

  const handleSaveTiming = () => {
    onChangeDuration(duration)
  }

  const handleCancelTiming = () => {
    setDuration(activity.workup.duration)
  }

  return (
    <OptionalFormSet
      groupLabel='Timing'
      valueSummary={!!duration ? TimeDecorator.timeString(duration) : undefined}
      openSubFormLabel={openSubFormLabel}
      onSave={handleSaveTiming}
      onCancel={handleCancelTiming}
      onToggleSubform={onToggleSubform}
      type={activityType}
    >
      <DurationSelection duration={duration} onChangeDuration={setDuration} />
    </OptionalFormSet>
  )
}

export default TimingFormSet
