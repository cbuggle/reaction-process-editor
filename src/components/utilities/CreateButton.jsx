import React from 'react';
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreateButton = ({ label, type, onClick }) => {
    return (
        <Button color={type} onClick={onClick} className='create-button'>
            <FontAwesomeIcon icon={"plus"} />
            <span>{label}</span>
        </Button>
    );
};

export default CreateButton;
