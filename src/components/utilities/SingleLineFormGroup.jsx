import React from 'react';
import { FormGroup, Label } from "reactstrap";
import TooltipButton from "./TooltipButton";

const SingleLineFormGroup = ({ label, tooltip, tooltipId, children }) => {
  return (
    <FormGroup className='row gx-2 pt-1'>
      <Label className='col-5 col-form-label d-flex'>
        {label}
        {tooltip &&
          <TooltipButton tooltip={tooltip} tooltipId={tooltipId} />
        }
      </Label>
      <div className='col-7'>
        {children}
      </div>
    </FormGroup>
  );
};

export default SingleLineFormGroup;
