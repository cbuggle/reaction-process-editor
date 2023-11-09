import {Label, Row} from "reactstrap";
import NumericalInput from "../../../../utilities/NumericalInput";
import MetricsDecorator from "../../../../../decorators/MetricsDecorator";
import IconButton from "../../../../utilities/IconButton";
import React from "react";

export const SolventListEntry = (
  {
      label,
      ratio,
      index,
      onRemoveSolvent,
      onSetRatio
  }) => {
  const handleSetRatio = (value) => {
    onSetRatio({value, index})
  }
  return (
    <Row className='gx-2 pt-1'>
      <Label className='col-9 col-form-label'>
        {label}
      </Label>
      <div className='col-2'>
        <NumericalInput
          className='form-control'
          value={ratio}
          initialStepValue={MetricsDecorator.defaultUnitType('REPETITIONS').initialStepValue}
          onChange={handleSetRatio}
        />
      </div>
      <div className='col-1 d-flex justify-content-end'>
        <IconButton
          positive={true}
          icon='trash'
          onClick={onRemoveSolvent(index)}
        />
      </div>
    </Row>
  )
}
