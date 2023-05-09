import React from 'react';
import { Button } from "reactstrap";

const FormButtons = ({ onCancel, onSave, type, saveLabel='Save', separator = false }) => {
  const classNames = (
    'form-buttons d-grid gap-2 d-md-flex justify-content-md-end' +
    ' form-buttons--' + type +
    (separator ? ' form-buttons--separated' : '')
  )

  return (
    <div className={classNames}>
      <Button color={type} onClick={onCancel} outline>Cancel</Button>
      <Button color={type} onClick={onSave}>{saveLabel}</Button>
    </div>
  );
};

export default FormButtons;
