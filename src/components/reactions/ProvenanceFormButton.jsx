import React, { useState } from 'react'

import { Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';

import ProvenanceForm from './ProvenanceForm';
import IconButton from "../utilities/IconButton";

const ProvenanceFormButton = ({ provenance }) => {

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => { setShowModal(!showModal) }

  return (
    <>
      <IconButton
        id="provenance-button"
        icon='pen'
        size='lg'
        className='icon-button--positive'
        onClick={toggleModal}
      />
      < UncontrolledTooltip target={"provenance-button"} >
        Edit the Provenance metadata of the reaction.
      </UncontrolledTooltip >
      <Modal
        className='modal--brand1 d-flex align-items-center justify-content-center'
        isOpen={showModal}
        autoFocus={true}
        toggle={toggleModal}
        backdrop={"static"}
      >
        <ModalHeader>Reaction Process Provenance</ModalHeader>
        <ModalBody>
          <ProvenanceForm provenance={provenance} closeForm={toggleModal} />
        </ModalBody>
      </Modal>
    </>
  )
}

export default ProvenanceFormButton
