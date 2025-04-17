import React, { useState } from 'react'

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ChromatographyPoolingForm from './ChromatographyPoolingForm';

const ChromatographyPoolingFormModal = (
	{
		activity,
		onResolvePooling
	}) => {

	const [showModal, setShowModal] = useState(false)
	const toggleModal = () => { setShowModal(!showModal) }

	const handleResolvePooling = () => {
		toggleModal()
		onResolvePooling()
	}

	return (
		<>
			<Button onClick={toggleModal}>
				Select Vials
			</Button>
			<Modal
				className={'d-flex align-items-center justify-content-center modal--primary modal-xl'}
				isOpen={showModal}
				autoFocus={true}
				toggle={toggleModal}
				backdrop={"static"}
			>
				<ModalHeader>Select Vials From Automation</ModalHeader>
				<ModalBody>
					<ChromatographyPoolingForm
						activity={activity}
						onResolvePooling={handleResolvePooling}
						onCancel={toggleModal}
					/>
				</ModalBody>
			</Modal>
		</>
	)
}

export default ChromatographyPoolingFormModal
