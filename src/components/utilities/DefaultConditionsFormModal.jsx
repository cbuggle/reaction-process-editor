import React, { useState } from 'react'

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import DefaultConditionsForm from './DefaultConditionsForm';

const DefaultConditionsFormModal = (
  {
    preConditions,
    defaultConditions,
    conditionEquipmentOptions,
    onToggleModal,
    isOpen,
    scope
  }) => {

  return (
    <Modal
      className='modal--primary d-flex align-items-center justify-content-center'
      isOpen={isOpen}
      autoFocus={true}
      toggle={onToggleModal}
      backdrop={"static"}
    >
      <ModalHeader>{scope} Default Conditions</ModalHeader>
      <ModalBody>
        <DefaultConditionsForm
          defaultConditions={defaultConditions}
          preConditions={preConditions}
          conditionEquipmentOptions={conditionEquipmentOptions}
          closeForm={onToggleModal}
          scope={scope}
        />
      </ModalBody>
    </Modal>
  )
}

export default DefaultConditionsFormModal
