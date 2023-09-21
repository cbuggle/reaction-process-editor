import TimeDecorator from "../../../decorators/TimeDecorator";
import OptionalFormSet from "./OptionalFormSet";
import React, {useState} from "react";
import DurationSelection from "../../utilities/DurationSelection";
import {FormGroup, Input, Label} from "reactstrap";
import DateTimePicker from "react-datetime-picker";

const TimingFormSet = (
  {
    activityType,
    activity,
    openSubFormLabel,
    onToggleSubform,
    onChangeDuration,
    onWorkupChange
  }) => {
  const [duration, setDuration] = useState(!!activity.workup.duration ? activity.workup.duration : 0)
  const [defineTimeSpan, setDefineTimeSpan] = useState(false)
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())

  const dateTimePickerFormat = "HH:mm:ss dd.MM.y"

  const handleCheckboxTimeSpan = (event) => {
    setDefineTimeSpan(event.target.checked)
    if (event.target.checked) {
      handleStartTime(new Date())
    }
  }

  const handleDuration = (value) => {
    setDuration(value)
    if(defineTimeSpan) {
      const endDate = new Date(startTime)
      endDate.setMilliseconds(startTime.getMilliseconds() + value)
      setEndTime(endDate)
    }
  }

  const handleStartTime = (value) => {
    const endDate = new Date(value)
    endDate.setMilliseconds(value.getMilliseconds() + duration)
    setStartTime(value)
    setEndTime(endDate)
  }

  const handleEndTime = (value) => {
    const startMs = startTime.getTime();
    const endMs = value.getTime();

    if (endMs > startMs) {
      setEndTime(value)
      setDuration(value - startTime)
    } else {
      setEndTime(startTime)
      setDuration(0)
    }
  }

  const handleSaveTiming = () => {
    onChangeDuration(duration)
    if(defineTimeSpan) {
      onWorkupChange({name: 'starts_at', value: startTime})
      onWorkupChange({name: 'ends_at', value: endTime})
    } else {
      onWorkupChange({name: 'starts_at', value: undefined})
      onWorkupChange({name: 'ends_at', value: undefined})
    }
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
      <DurationSelection duration={duration} onChangeDuration={handleDuration} />
      <FormGroup check className='mb-3'>
        <Label check>
          <Input type="checkbox" checked={defineTimeSpan} onChange={handleCheckboxTimeSpan} />
          Time Span
        </Label>
      </FormGroup>
      {defineTimeSpan &&
        <>
          <FormGroup className='row gx-2 pt-1'>
            <Label className='col-3 col-form-label d-flex'>
              Start
            </Label>
            <div className='col-9'>
              <DateTimePicker
                onChange={value => handleStartTime(value)}
                format={dateTimePickerFormat}
                value={startTime}
                className='react-datetime-picker--overwrite'
              />
            </div>
          </FormGroup>
          <FormGroup className='row gx-2 pt-1'>
            <Label className='col-3 col-form-label d-flex'>
              End
            </Label>
            <div className='col-9'>
              <DateTimePicker
                onChange={value => handleEndTime(value)}
                format={dateTimePickerFormat}
                value={endTime}
                className='react-datetime-picker--overwrite'
              />
            </div>
          </FormGroup>
        </>
      }
    </OptionalFormSet>
  )
}

export default TimingFormSet
