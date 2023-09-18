import TimeDecorator from "../../decorators/TimeDecorator";
import React, {useState, useEffect} from "react";
import {Row, Col, Label} from "reactstrap";
import NumericInput from "react-numeric-input";

const DurationSelection = ({ duration, onChangeDuration}) => {
  const timeObject = TimeDecorator.hourBasedTimespan(duration)
  const [hours, setHours] = useState(timeObject.hours)
  const [minutes, setMinutes] = useState(timeObject.minutes)
  const [seconds, setSeconds] = useState(timeObject.seconds)

  useEffect(() => {
    calculateDuration()
  }, [hours, minutes, seconds]);

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
    <Row className='gx-1'>
      <Col md={3}>
        <NumericInput
          id='hoursInput'
          value={hours}
          step={1}
          min={0}
          size={8}
          onChange={setHours}
          className='form-control'
          snap
        />
      </Col>
      <Label className='col-1 col-form-label'>h</Label>
      <Col md={3}>
        <NumericInput
          id='minutesInput'
          value={minutes}
          step={1}
          min={0}
          max={60}
          size={8}
          onChange={setMinutes}
          className='form-control'
          snap
        />
      </Col>
      <Label className='col-1 col-form-label'>min</Label>
      <Col md={3}>
        <NumericInput
          id='secondsInput'
          value={seconds}
          step={1}
          min={0}
          max={60}
          size={8}
          onChange={setSeconds}
          className='form-control'
          snap
        />
      </Col>
      <Label className='col-1 col-form-label'>s</Label>
    </Row>
  );
};

export default DurationSelection;
