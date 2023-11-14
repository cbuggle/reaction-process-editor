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
    <Row className='gx-2 py-1 px-2 mx-0'>
      <Label className='col-9 col-form-label'>
        {label}
      </Label>
      <div className='col-2'>
        <NumericalInput
          className='form-control'
          value={ratio}
          initialStep={MetricsDecorator.defaultUnitType('REPETITIONS').initialStep}
          onChange={handleSetRatio}
        />
      </div>
      <div className='col-1 d-flex flex-column justify-content-center'>
        <div>
          <IconButton
            positive={true}
            icon='trash'
            onClick={onRemoveSolvent(index)}
          />
        </div>
      </div>
    </Row>
  )
}
