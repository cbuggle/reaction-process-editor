import TimeDecorator from "../../../../decorators/TimeDecorator";
import OptionalFormSet from "./OptionalFormSet";
import React, { useContext, useEffect, useState } from "react";
import DurationSelection from "../../../utilities/DurationSelection";
import { Button, FormGroup, Input, Label } from "reactstrap";
import DateTimePicker from "react-datetime-picker";

import { SubFormController } from "../../../../contexts/SubFormController";

const TimingFormSet = (
  {
    activityType,
    activity,
    onChangeDuration,
    onWorkupChange
  }) => {

  const [duration, setDuration] = useState(!!activity.workup.duration ? activity.workup.duration : 0)
  const [defineTimeSpan, setDefineTimeSpan] = useState(!!activity.workup.starts_at)
  const [startTime, setStartTime] = useState(!!activity.workup.starts_at ? new Date(activity.workup.starts_at) : new Date())
  const [endTime, setEndTime] = useState(!!activity.workup.ends_at ? new Date(activity.workup.ends_at) : new Date())
  const [timerRunning, setTimerRunning] = useState(false)

  const [timerIntervalId, setTimerIntervalId] = useState(NaN)
  const [summary, setSummary] = useState(TimeDecorator.summary(activity.workup))
  const [timerRunningFromWorkup, setTimerRunningFromWorkup] = useState(activity.workup.timer_started_at)

  const subFormController = useContext(SubFormController)

  const dateTimePickerFormat = "HH:mm:ss dd.MM.y"

  useEffect(() => {
    if (timerRunning) {
      clearInterval(timerIntervalId)

      setTimerIntervalId(setInterval(updateTimer, 1000))
    } else if (timerRunningFromWorkup) {
      setStartTime(new Date(activity.workup.timer_started_at))
      setTimerRunning(true)
      setTimerRunningFromWorkup(false)
      subFormController.openSubForm('Timing')
    } else {
      clearInterval(timerIntervalId)
      setTimerIntervalId(NaN)
    }
    // eslint-disable-next-line
  }, [timerRunning, activity.workup, activity, activity.workup.timer_started_at])

  useEffect(() => {
    setSummary(TimeDecorator.summary(activity.workup))
  }, [activity])

  const handleCheckboxTimeSpan = (event) => {
    setDefineTimeSpan(event.target.checked)
    if (event.target.checked) {
      handleStartTime(new Date())
    }
  }

  const handleDuration = (value) => {
    setDuration(value)
    if (defineTimeSpan) {
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

  const updateTimer = () => {
    handleEndTime(new Date())
  }

  const toggleTimer = () => {
    if (timerRunning) {
      onWorkupChange({ name: 'timer_started_at', value: undefined })
    } else {
      setDefineTimeSpan(true)
      const timerStartDate = new Date()
      setStartTime(timerStartDate)
      setEndTime(timerStartDate)
      setDuration(0)
      onWorkupChange({ name: 'timer_started_at', value: timerStartDate })
    }
    setTimerRunning(!timerRunning)
  }

  const handleSaveTiming = () => {
    onChangeDuration(duration)
    if (defineTimeSpan) {
      onWorkupChange({ name: 'starts_at', value: startTime })
      onWorkupChange({ name: 'ends_at', value: endTime })
    } else {
      onWorkupChange({ name: 'starts_at', value: undefined })
      onWorkupChange({ name: 'ends_at', value: undefined })
    }
  }

  const handleCancelTiming = () => {
    setDuration(activity.workup.duration)
  }

  return (
    <OptionalFormSet
      subFormLabel='Timing'
      valueSummary={summary}
      onSave={handleSaveTiming}
      onCancel={handleCancelTiming}
      typeColor={activityType}
      disableFormButtons={timerRunning}
    >
      <OptionalFormSet.ExtraButton>
        <Button
          color='danger'
          onClick={toggleTimer}
        >
          {(timerRunning ? 'Stop' : 'Start') + ' Timer'}
        </Button>
      </OptionalFormSet.ExtraButton>
      <DurationSelection
        duration={duration}
        onChangeDuration={handleDuration}
        disabled={timerRunning}
      />
      <FormGroup check className='mb-3'>
        <Label check>
          <Input
            type="checkbox"
            checked={defineTimeSpan}
            onChange={handleCheckboxTimeSpan}
            disabled={timerRunning}
          />
          Time Span
        </Label>
      </FormGroup>
      {defineTimeSpan && !timerRunning &&
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
                disabled={timerRunning}
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
                disabled={timerRunning}
              />
            </div>
          </FormGroup>
        </>
      }
    </OptionalFormSet>
  )
}

export default TimingFormSet
