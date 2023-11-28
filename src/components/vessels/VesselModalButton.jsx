import React, { useState } from 'react'

import { Button, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import VesselIndex from './VesselIndex'

const VesselModalButton = () => {

  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleSelectVessel = (vessel) => {
    alert("Vessel selected. NYI.")
  }

  return (
    <>
      <Button outline onClick={toggleModal}>
        Select Vessel
      </Button>
      <Modal isOpen={modalOpen} toggle={toggleModal} backdrop={"static"}>
        <ModalHeader>
          <Label>Select Vessel</Label>
        </ModalHeader>
        <ModalBody>
          <VesselIndex onSelect={handleSelectVessel} />
        </ModalBody>
        <ModalFooter>
          <Button color="outline-secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default VesselModalButton
