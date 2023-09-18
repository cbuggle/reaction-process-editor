import React from 'react';
import { Button } from "reactstrap";

const FormButtons = (
  {
    onCancel,
    onSave,
    type,
    disabled,
    saveLabel='Save',
  }) => {
  const classNames = (
    'form-buttons d-grid gap-2 d-md-flex justify-content-md-end' +
    ' form-buttons--' + type
  )

  return (
    <div className={classNames}>
      <Button
        color={type}
        onClick={onCancel}
        disabled={disabled}
        outline
      >
        Cancel
      </Button>
      <Button
        color={type}
        onClick={onSave}
        disabled={disabled}
      >
        {saveLabel}
      </Button>
    </div>
  );
};

export default FormButtons;
