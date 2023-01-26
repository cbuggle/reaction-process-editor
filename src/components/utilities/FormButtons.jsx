import React from 'react';
import { Button } from "reactstrap";

const FormButtons = ({ onCancel, onSave, type }) => {
  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Button color={type} onClick={onCancel} outline>Cancel</Button>
      <Button color={type} onClick={onSave}>Save</Button>
    </div>
  );
};

export default FormButtons;
