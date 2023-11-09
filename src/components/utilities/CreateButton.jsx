import React from 'react';
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreateButton = (
  {
    label,
    type,
    onClick,
    size='lg'
  }) => {
    return (
        <Button color={type} onClick={onClick} className='create-button' size={size}>
            <FontAwesomeIcon icon={"plus"} />
            <span>{label}</span>
        </Button>
    );
};

export default CreateButton;
