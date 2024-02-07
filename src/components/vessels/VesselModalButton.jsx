import React, { useState } from "react";

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import VesselIndex from "./VesselIndex";

const VesselModalButton = ({
  onSelectVessel,
  typeColor,
  buttonLabel,
  scope,
}) => {
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
        className={"modal--" + typeColor}
      >
        <ModalHeader tag="h4">
          {buttonLabel} Vessel for {scope}
        </ModalHeader>
        <ModalBody>
          <VesselIndex
            onSelectVessel={handleSelectVessel}
            typeColor={typeColor}
          />
        </ModalBody>
        <ModalFooter>
          <Button outline color={typeColor} onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VesselModalButton;
