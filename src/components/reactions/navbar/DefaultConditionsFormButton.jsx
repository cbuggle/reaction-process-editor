import React, { useState } from 'react'

import { Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';

import DefaultConditionsForm from './DefaultConditionsForm';
import IconButton from "../../utilities/IconButton";

const DefaultConditionsFormButton = ({ defaultConditions, conditionEquipmentOptions }) => {

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => { setShowModal(!showModal) }

  return (
    <>
      <IconButton
        id="default-conditions-button"
        icon='temperature-high'
        size='lg'
        className='icon-button--positive'
        onClick={toggleModal}
      />
      < UncontrolledTooltip target={"default-conditions-button"} >
        Set the default conditions of the reaction.
      </UncontrolledTooltip >
      <Modal
        className='modal--primary d-flex align-items-center justify-content-center'
        isOpen={showModal}
        autoFocus={true}
        toggle={toggleModal}
        backdrop={"static"}
      >
        <ModalHeader>Reaction Process Default Conditions</ModalHeader>
        <ModalBody>
          <DefaultConditionsForm defaultConditions={defaultConditions}
            conditionEquipmentOptions={conditionEquipmentOptions}
            closeForm={toggleModal}
          />
        </ModalBody>
      </Modal>
    </>
  )
}

export default DefaultConditionsFormButton
