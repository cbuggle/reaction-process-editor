import React, { useState } from 'react'

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ChromatographyVialSelectForm from './ChromatographyVialSelectForm';


const ChromatographyVialSelectFormModal = (
	{
		activity
	}) => {

	const [showModal, setShowModal] = useState(false)
	const toggleModal = () => { setShowModal(!showModal) }

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
					<ChromatographyVialSelectForm
						activity={activity}
						closeForm={toggleModal}
					/>
				</ModalBody>
			</Modal>
		</>
	)
}

export default ChromatographyVialSelectFormModal
