import React from 'react';
import { FormGroup, Label } from "reactstrap";

const VialFormGroup = (
  {
    label = 'Vials',
    vials
  }) => {
  return (
    vials ?
      <FormGroup className='row gx-2 pt-1'>
        <Label className='col-5 col-form-label d-flex'>
          {label}
        </Label>
        <div className='col-7'>
          {vials.join(', ')}
        </div>
      </FormGroup>
      :
      <></>
  );
};

export default VialFormGroup;
