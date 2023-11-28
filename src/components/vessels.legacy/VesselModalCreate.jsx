import React, { useState } from 'react'

import { Button, Label, FormGroup, Input, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap'

import VesselForm from './VesselForm';
import VesselIndex from './VesselIndex';

const VesselModalCreate = ({ isOpen, vessel, vesselOptions, onCreate, onCancel, vesselIndex, onAssignVessel, onDeleteVessel }) => {

  const [assignToReaction, setAssignToReaction] = useState(false)
  const [vesselFormState, updateVesselForm] = useState(vessel)

  const onInputChange = (field) => {
    const { name, value } = field;
    updateVesselForm(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const handleCancel = () => {
    updateVesselForm(vessel)
    onCancel()
  }

  const handleSave = () => {
    onCreate(vesselFormState, assignToReaction)
  }

  const renderModalTitle = () => {
    return 'Create Vessel';
  }

  const renderAssignmentCheckbox = () => {
    return (
      <FormGroup check>
        <Label check>
          <Input type="checkbox"
            checked={assignToReaction}
            onChange={(event) => setAssignToReaction(event.target.checked)} />
          Assign to Reaction
        </Label>
      </FormGroup>
    )
  }

  const onCloneVessel = (vesselData) => {
    updateVesselForm(vesselData)
  }

  return (
    <Modal isOpen={isOpen} toggle={handleCancel} backdrop={"static"}>
      <ModalHeader>
        <Label>
          <Button color="outline-secondary" size="sm" onClick={handleCancel}>x</Button>
        </Label>
        <Label> {renderModalTitle()}</Label>
      </ModalHeader>
      <ModalBody>
        <Row className="scroll-container-modal">
          <Col md="3" className="scroll-body" >
            <Label> Templates</Label>
            <VesselIndex vessels={vesselIndex} vesselOptions={vesselOptions} onAssignVessel={onAssignVessel} onDeleteVessel={onDeleteVessel} onCloneVessel={onCloneVessel} />
          </Col>
          <Col md="9">
            <VesselForm vessel={vesselFormState} vesselOptions={vesselOptions} onInputChange={onInputChange} />
            <ModalFooter>
              {renderAssignmentCheckbox()}
              <Button color="success" onClick={handleSave}>Create</Button>
              <Button color="outline-secondary" onClick={handleCancel}>Cancel</Button>
            </ModalFooter>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default VesselModalCreate
