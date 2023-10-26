import React, { useEffect, useState } from "react";
import { Label, FormGroup } from "reactstrap";

import NumericalInput from "./NumericalInput";
import TimeDecorator from "../../decorators/TimeDecorator";

const DurationSelection = (
  {
    duration,
    onChangeDuration,
    disabled
  }) => {
  const timeObject = TimeDecorator.hourBasedTimespan(duration)
  const [hours, setHours] = useState(timeObject.hours)
  const [minutes, setMinutes] = useState(timeObject.minutes)
  const [seconds, setSeconds] = useState(timeObject.seconds)

  useEffect(() => {
    calculateDuration()
    // eslint-disable-next-line
  }, [hours, minutes, seconds]);

  useEffect(() => {
    const newTimeObject = TimeDecorator.hourBasedTimespan(duration)
    setHours(newTimeObject.hours)
    setMinutes(newTimeObject.minutes)
    setSeconds(newTimeObject.seconds)
  }, [duration])

  const calculateDuration = () => {
    onChangeDuration(
      TimeDecorator.calculateDuration(
        {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        }
      )
    )
  }

  return (
    <FormGroup className='row gx-2 pt-1 duration-selection'>
      <Label className='col-3 col-form-label d-flex'>
        Duration
      </Label>
      <div className='duration-selection__input-container'>
        <NumericalInput
          id='hoursInput'
          value={hours}
          step={1}
          min={0}
          size={8}
          onChange={setHours}
          className='form-control'
          snap
          disabled={disabled}
        />
      </div>
      <Label className='col-form-label duration-selection__form-label'>h</Label>
      <div className='duration-selection__input-container'>
        <NumericalInput
          id='minutesInput'
          value={minutes}
          step={1}
          min={0}
          max={60}
          size={8}
          onChange={setMinutes}
          className='form-control'
          snap
          disabled={disabled}
        />
      </div>
      <Label className='col-form-label duration-selection__form-label'>min</Label>
      <div className='duration-selection__input-container'>
        <NumericalInput
          id='secondsInput'
          value={seconds}
          step={1}
          min={0}
          max={60}
          size={8}
          onChange={setSeconds}
          className='form-control'
          snap
          disabled={disabled}
        />
      </div>
      <Label className='col-form-label duration-selection__form-label'>s</Label>
    </FormGroup>
  );
};

export default DurationSelection;
