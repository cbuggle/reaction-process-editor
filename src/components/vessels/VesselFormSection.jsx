import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
} from "reactstrap";

import VesselIndex from "./VesselIndex";
import VesselDecorator from "../../decorators/VesselDecorator";

const VesselModalButton = ({
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
    <div className={"mb-3 form-section form-section--" + typeColor}>
      <div className="d-flex justify-content-between align-self-center">
        <Label
          className={
            "col-form-label" + (!!currentVessel ? "" : " label--disabled")
          }
        >
          Vessel: {VesselDecorator.vesselSingleLine(currentVessel) || "-"}
        </Label>
        <div className="optional-form-group__open-controls">
          <div className="d-grid gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VesselModalButton;
