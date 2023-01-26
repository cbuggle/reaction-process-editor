import React, { useState } from 'react'

import { Button, Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProvenanceForm from './ProvenanceForm';

const ProvenanceFormButton = ({ provenance }) => {

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => { setShowModal(!showModal) }

  return (
    <>
      <Button id="provenance-button" color="info" size="sm" onClick={toggleModal}>
        <FontAwesomeIcon size="lg" icon='pen' />
      </Button>
      < UncontrolledTooltip target={"provenance-button"} >
        Edit the Provenance metadata of the reaction.
      </UncontrolledTooltip >
      <Modal isOpen={showModal} autoFocus={true} toggle={toggleModal} backdrop={"static"}>
        <ModalHeader>
          Reaction Process Provenance
        </ModalHeader>
        <ModalBody>
          <ProvenanceForm provenance={provenance} closeForm={toggleModal} />
        </ModalBody>
      </Modal>
    </>
  )
}

export default ProvenanceFormButton
