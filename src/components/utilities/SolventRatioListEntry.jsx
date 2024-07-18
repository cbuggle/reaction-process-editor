import React from "react";
import { Label, Row } from "reactstrap";

import IconButton from "./IconButton";
import MetricsDecorator from "../../decorators/MetricsDecorator";
import NumericalInput from "./NumericalInput";

export const SolventRatioListEntry = (
  {
    solvent,
    index,
    onRemoveSolvent,
    onSetAmount
  }) => {

  return (
    <Row className='gx-2 py-1 px-2 mx-0'>
      <Label className='col-9 col-form-label'>
        {solvent.label}
      </Label>
      <div className='col-2'>
        <NumericalInput
          className='form-control'
          value={solvent.ratio}
          min={MetricsDecorator.inputRange('RATIO').min}
          initialstep={MetricsDecorator.inputRange('RATIO').initialstep}
          onChange={onSetAmount}
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
