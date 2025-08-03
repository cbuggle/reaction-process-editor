import React, { useState } from 'react';
import { Collapse, FormGroup, Label } from "reactstrap";

import IconButton from '../../../utilities/IconButton';

const FractionFormGroup = (
  {
    fraction,
  }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    fraction ?
      <FormGroup className='row gx-2 pt-1'>
        <Label className='col-5 col-form-label d-flex'>
          Fraction #{fraction.position}
        </Label>
        <Label className='col-7'>
          <IconButton onClick={toggle} icon={isOpen ? 'chevron-circle-down' : 'chevron-circle-right'}>
          </IconButton>
          {fraction.vials?.length || 'No'}
          {' Vials'}
        </Label>

        <Collapse isOpen={isOpen}>
          {'Vials: '}
          {fraction.vials?.join(', ') || 'none'}
        </Collapse>
      </FormGroup >
      :
      <></>
  );
};

export default FractionFormGroup;
