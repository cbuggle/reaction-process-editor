import React from 'react'

import NumericInput from 'react-numeric-input';

// TODO: TemperaturInput is a misleading name. Rename reasonably  ("NumericalInputWithUnit" or something)
const TemperatureInput = ({ name, label, value, min, max, precision, step, unit, onWorkupChange }) => {

  const handleNumericInput = (value) => {
    onWorkupChange({ name: name, value: value })
  }

  return (
    <>
      {label}
      <NumericInput precision={precision} step={step} value={value} min={min} max={max} size={8} onChange={handleNumericInput} snap />
      {' '} {unit}
    </>
  )
}

export default TemperatureInput
