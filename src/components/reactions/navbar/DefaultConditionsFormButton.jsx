import React, { useState } from 'react'

import { Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';

import DefaultConditionsForm from './DefaultConditionsForm';
import IconButton from "../../utilities/IconButton";

const DefaultConditionsFormButton = ({ preConditions, defaultConditions, conditionsEquipmentOptions, scope }) => {

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => { setShowModal(!showModal) }

  const iconClassName = scope === 'Reaction' ? '--positive' : ''

  return (
    <>
      <IconButton
        id={"default-conditions-button-" + scope}
        icon='temperature-high'
        size='lg'
        className={'icon-button' + iconClassName}
        onClick={toggleModal}
      />
      < UncontrolledTooltip target={"default-conditions-button-" + scope} >
        Set the default conditions of the {scope}.
      </UncontrolledTooltip >
      <Modal
        className='modal--primary d-flex align-items-center justify-content-center'
        isOpen={showModal}
        autoFocus={true}
        toggle={toggleModal}
        backdrop={"static"}
      >
        <ModalHeader>{scope} Default Conditions</ModalHeader>
        <ModalBody>
          <DefaultConditionsForm
            defaultConditions={defaultConditions}
            preConditions={preConditions}
            conditionsEquipmentOptions={conditionsEquipmentOptions}
            closeForm={toggleModal}
            scope={scope}
          />
        </ModalBody>
      </Modal>
    </>
  )
}

export default DefaultConditionsFormButton
