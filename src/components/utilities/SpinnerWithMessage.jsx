import React from 'react';
import {Modal, Spinner} from 'reactstrap';

const SpinnerWithMessage = ({ message, isOpen }) => {
    return (
      <Modal isOpen={isOpen} className='spinner-with-message' centered={true}>
        <div className='spinner-with-message__content d-flex flex-column align-items-center justify-content-around'>
          <div className='spinner__container'>
            <div className='spinner-transformer'>
              <Spinner className='text-primary'/>
            </div>
            <div className='spinner-transformer'>
              <Spinner animation='border' className='text-warning'/>
            </div>
            <div className='spinner-transformer'>
              <Spinner className='text-danger'/>
            </div>
          </div>
          <p className='fw-bold text-white'>{message}</p>
        </div>
      </Modal>
    );
};

export default SpinnerWithMessage;
