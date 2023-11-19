import React from "react"
import { Button } from "reactstrap";

const TimerButton = (
  {
    timerRunning,
    onToggleTimer
  }) => {
  return (
    <Button
    color='danger'
    onClick={onToggleTimer}
  >
    {(timerRunning ? 'Stop' : 'Start') + ' Timer'}
  </Button>
  )
};

export default TimerButton;
