import React from 'react';
import {FormGroup, Label} from "reactstrap";
import TooltipButton from "../../utilities/TooltipButton";

const ActionFormGroup = ({label, tooltip, tooltipId, children}) => {
  return (
    <FormGroup className='row gx-2'>
      <Label className='col-4 col-form-label d-flex'>
        {label}
        {tooltip &&
          <TooltipButton tooltip={tooltip} tooltipId={tooltipId} />
        }
      </Label>
      <div className='col-8'>
        {children}
      </div>
    </FormGroup>
  );
};

export default ActionFormGroup;
