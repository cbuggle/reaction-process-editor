import React, { useState } from 'react'

import { Button, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import VesselForm from './VesselForm';

const VesselModalEdit = ({ isOpen, vessel, vesselOptions, onSave, onCancel, onDeleteVessel }) => {

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
    onSave(vesselFormState)
  }

  const confirmDelete = () => {

    window.confirm('Deleting the Vessel will unassign it from all ProcessSteps. Are you sure?')
      && deleteVessel()
  }

  const deleteVessel = () => {
    onDeleteVessel(vessel.id)
    handleCancel()
  }


  const renderDeleteButton = () => {
    return (
      <Button className="vessel-delete-button" color="outline-danger" onClick={confirmDelete}>Unassign</Button>
    )
  }
  const renderModalTitle = () => {
    return 'Edit Vessel';
  }

  return (
    <Modal isOpen={isOpen} toggle={handleCancel} backdrop={"static"}>
      <ModalHeader>
        {renderDeleteButton()}
        <Label> {renderModalTitle()} </Label>
      </ModalHeader>
      <ModalBody>
        <VesselForm vessel={vesselFormState} vesselOptions={vesselOptions} onInputChange={onInputChange} />
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSave}>Save</Button>
        <Button color="outline-secondary" onClick={handleCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default VesselModalEdit
