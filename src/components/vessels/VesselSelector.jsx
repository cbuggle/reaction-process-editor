import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  InputGroup,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import VesselIndex from "./VesselIndex";
import VesselDecorator from "../../decorators/VesselDecorator";

const VesselSelector = ({
  currentVessel,
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
      <InputGroup>
        <Input
          value={VesselDecorator.vesselSingleLine(currentVessel) || "-"}
          onClick={toggleModal}
          readOnly
        />
        <Button onClick={toggleModal} color={typeColor}>
          <FontAwesomeIcon icon="list" />
        </Button>
      </InputGroup>
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

export default VesselSelector;
