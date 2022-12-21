import React from 'react';
import {Container, Row, Spinner} from "reactstrap";

const SpinnerWithMessage = ({message}) => {
    return (
        <div className='spinner-with-message d-flex flex-column align-items-center justify-content-around'>
            <p className='text-center'>{message}</p>
            <Spinner />
        </div>
    );
};

export default SpinnerWithMessage;
