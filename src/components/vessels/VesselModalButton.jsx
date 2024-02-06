import React, { useState } from "react";

import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

import VesselIndex from "./VesselIndex";

const VesselModalButton = ({ onSelectVessel, typeColor, buttonLabel }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSelectVessel = (vesselId) => () => {
    toggleModal();
    onSelectVessel(vesselId);
  };

  return (
    <>
      <Button outline onClick={toggleModal} color={typeColor}>
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop={"static"}
        fullscreen={true}
      >
        <ModalHeader>
          <Label>{buttonLabel} Vessel</Label>
        </ModalHeader>
        <ModalBody>
          <VesselIndex onSelectVessel={handleSelectVessel} />
        </ModalBody>
        <ModalFooter>
          <Button color="outline-secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VesselModalButton;
