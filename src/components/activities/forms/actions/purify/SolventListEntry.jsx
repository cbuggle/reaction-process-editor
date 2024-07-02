import React from "react";
import { Label, Row } from "reactstrap";

import IconButton from "../../../../utilities/IconButton";
import MetricsDecorator from "../../../../../decorators/MetricsDecorator";
import NumericalInput from "../../../../utilities/NumericalInput";

export const SolventListEntry = (
  {
    label,
    ratio,
    index,
    onRemoveSolvent,
    onSetRatio
  }) => {

  return (
    <Row className='gx-2 py-1 px-2 mx-0'>
      <Label className='col-9 col-form-label'>
        {label}
      </Label>
      <div className='col-2'>
        <NumericalInput
          className='form-control'
          value={ratio}
          min={MetricsDecorator.unitType('RATIO').inputRange.min}
          initialstep={MetricsDecorator.unitType('RATIO').inputRange.initialstep}
          onChange={onSetRatio}
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
