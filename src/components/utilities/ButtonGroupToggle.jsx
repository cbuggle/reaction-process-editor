import {Button, ButtonGroup} from "reactstrap";
import React from "react";

const ButtonGroupToggle = (
  {
    value,
    onChange,
    options,
    activityType = 'action'
  }) => {
  return (
    <ButtonGroup size='lg' className='d-flex my-1'>
      {options.map((option, index) => (
        <Button
          key={option.label + index}
          outline
          color={activityType}
          onClick={() => {onChange(option.value)}}
          active={value === option.value}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default ButtonGroupToggle
