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

  const typeColor = scope === 'User' ? 'secondary' : 'primary'

  return (
    <Modal
      className={'d-flex align-items-center justify-content-center modal--' + typeColor}
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
          typeColor={typeColor}
          scope={scope}
        />
      </ModalBody>
    </Modal>
  )
}

export default DefaultConditionsFormModal
