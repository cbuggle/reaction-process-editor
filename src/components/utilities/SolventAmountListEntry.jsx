import React from "react";
import { Label, Row } from "reactstrap";

import IconButton from "./IconButton";
import NumericalInput from "./NumericalInput";

import MetricsDecorator from "../../decorators/MetricsDecorator";

export const SolventAmountListEntry = (
  {
    solvent,
    index,
    onRemoveSolvent,
    onSetAmount,
  }) => {

    const handleChangeAmount = (value) => {
      onSetAmount({value: value, unit: 'ml'})
    }

  return (
    <Row className='gx-2 py-1 px-2 mx-0'>
      <Label className='col-8 col-form-label'>
        {solvent.label}
      </Label>
      <div className='col-3'>
        <NumericalInput
          className='form-control'
          value={solvent.amount.value}
          min={MetricsDecorator.inputRange('ml').min}
          initialstep={MetricsDecorator.inputRange('ml').initialstep}
          onChange={handleChangeAmount}
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
