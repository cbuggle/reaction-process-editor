import React, { useContext, useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import DurationSelection from "../../utilities/DurationSelection";
import OptionalFormSet from "../../utilities/OptionalFormSet";
import TimerButton from "./TimerButton";

import TimeDecorator from "../../../decorators/TimeDecorator";
import { SubFormController } from "../../../contexts/SubFormController";

const Timer = ({
  activityType,
  workup,
  onSave,
  onChangeDuration,
  onWorkupChange,
  displayMode,
}) => {
  const [duration, setDuration] = useState(
    !!workup?.duration ? workup.duration : 0
  );
  const [defineTimeSpan, setDefineTimeSpan] = useState(!!workup?.starts_at);
  const [startTime, setStartTime] = useState(
    !!workup?.starts_at ? new Date(workup.starts_at) : new Date()
  );
  const [endTime, setEndTime] = useState(
    !!workup?.ends_at ? new Date(workup.ends_at) : new Date()
  );
  const [timerRunning, setTimerRunning] = useState(false);

  const [timerIntervalId, setTimerIntervalId] = useState(NaN);
  const [timerRunningFromWorkup, setTimerRunningFromWorkup] = useState(
    !!workup?.timer_running
  );
  const [timerResultPending, setTimerResultPending] = useState(false);

  const subFormController = useContext(SubFormController);

  const dateTimePickerFormat = "HH:mm:ss dd.MM.y";

  useEffect(() => {
    if (timerRunning) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(setInterval(updateTimer, 1000));
    } else if (timerRunningFromWorkup) {
      setTimerRunning(true);
      setTimerRunningFromWorkup(false);
      subFormController.openSubForm("Timing");
    } else {
      clearInterval(timerIntervalId);
      setTimerIntervalId(NaN);
    }
    // eslint-disable-next-line
  }, [
    timerRunning,
    workup,
    subFormController,
    subFormController.openSubFormLabel,
  ]);

  useEffect(() => {
    if (timerResultPending && !workup?.timer_running) {
      setTimerResultPending(false);
      onSave();
    }
    // eslint-disable-next-line
  }, [timerResultPending, workup]);

  const summary = () => {
    return TimeDecorator.summary(duration, startTime, endTime);
  };

  const handleCheckboxTimeSpan = (event) => {
    setDefineTimeSpan(event.target.checked);
    if (event.target.checked) {
      handleStartTime(new Date());
    }
  };

  const handleDuration = (value) => {
    setDuration(value);
    if (defineTimeSpan) {
      const endDate = new Date(startTime);
      endDate.setMilliseconds(startTime.getMilliseconds() + value);
      setEndTime(endDate);
    }
  };

  const handleStartTime = (value) => {
    const endDate = new Date(value);
    endDate.setMilliseconds(value.getMilliseconds() + duration);
    setStartTime(value);
    setEndTime(endDate);
  };

  const handleEndTime = (value) => {
    const startMs = startTime.getTime();
    const endMs = value.getTime();

    if (endMs > startMs) {
      setEndTime(value);
      setDuration(value - startTime);
    } else {
      setEndTime(startTime);
      setDuration(0);
    }
  };

  const updateTimer = () => {
    handleEndTime(new Date());
  };

  const toggleTimer = () => {
    if (timerRunning) {
      onWorkupChange({ name: "timer_running", value: false });
      handleSaveTiming();
    } else {
      setDefineTimeSpan(true);
      const timerStartDate = new Date();
      setStartTime(timerStartDate);
      setEndTime(timerStartDate);
      setDuration(0);
      onWorkupChange({ name: "timer_running", value: true });
      onWorkupChange({ name: "starts_at", value: timerStartDate });
      subFormController.closeSubForm("UnsavedTiming");
    }
    setTimerRunning(!timerRunning);
  };

  const handleSaveTiming = () => {
    subFormController.closeSubFormArray(["Timing", "UnsavedTiming"]);
    onChangeDuration(duration);
    if (defineTimeSpan) {
      onWorkupChange({ name: "starts_at", value: startTime });
      onWorkupChange({ name: "ends_at", value: endTime });
    } else {
      onWorkupChange({ name: "starts_at", value: undefined });
      onWorkupChange({ name: "ends_at", value: undefined });
    }
  };

  const handleCancelTiming = () => {
    subFormController.closeSubForm("UnsavedTiming");
    subFormController.closeSubForm("Timing");
    setDuration(0);
    setDefineTimeSpan(false);
  };

  const stopTimerAndSave = () => {
    toggleTimer();
    setTimerResultPending(true);
  };

  const renderFormSet = () => {
    return (
      <OptionalFormSet
        subFormLabel="Timing"
        valueSummary={summary()}
        onSave={handleSaveTiming}
        onCancel={handleCancelTiming}
        typeColor={activityType}
        disableFormButtons={timerRunning}
      >
        <OptionalFormSet.ExtraButton>
          <TimerButton
            onToggleTimer={toggleTimer}
            timerRunning={timerRunning}
          />
        </OptionalFormSet.ExtraButton>
        <DurationSelection
          duration={duration}
          onChangeDuration={handleDuration}
          disabled={timerRunning}
        />
        <FormGroup check className="mb-3">
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
        {defineTimeSpan && (
          <>
            <FormGroup className="row gx-2 pt-1">
              <Label className="col-3 col-form-label d-flex">Start</Label>
              <div className="col-9">
                <DateTimePicker
                  onChange={(value) => handleStartTime(value)}
                  format={dateTimePickerFormat}
                  value={startTime}
                  className="react-datetime-picker--overwrite"
                  disabled={timerRunning}
                />
              </div>
            </FormGroup>
            <FormGroup className="row gx-2 pt-1">
              <Label className="col-3 col-form-label d-flex">End</Label>
              <div className="col-9">
                <DateTimePicker
                  onChange={(value) => handleEndTime(value)}
                  format={dateTimePickerFormat}
                  value={endTime}
                  className="react-datetime-picker--overwrite"
                  disabled={timerRunning}
                />
              </div>
            </FormGroup>
          </>
        )}
      </OptionalFormSet>
    );
  };

  const renderInfo = () => {
    if (!!summary()) {
      return (
        <div className={"timer__info mt-2 pt-1 timer__info--" + activityType}>
          {timerRunning ? (
            <>
              <h6 className="my-1">Timer running</h6>
              <p>{summary()}</p>
              <div className="d-flex flex-row-reverse">
                <TimerButton
                  timerRunning={true}
                  onToggleTimer={stopTimerAndSave}
                />
              </div>
            </>
          ) : (
            <p>Timing: {summary()}</p>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return <>{displayMode === "form" ? renderFormSet() : renderInfo()}</>;
};

export default Timer;
