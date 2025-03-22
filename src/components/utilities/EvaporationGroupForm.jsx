import React, { useState } from 'react'
import VialSelectDecorator from '../../decorators/VialSelectDecorator'
import { Button, Row, Col } from 'reactstrap'
import VesselableFormSection from '../vesselables/VesselableFormSection'

const EvaporationGroupForm = ({ group, groupNo, onSave }) => {

	const colorStyle = VialSelectDecorator.colorFor(groupNo)

	const [reactionProcessVessel, setReactionProcessVessel] = useState({})

	const createEvaporation = () => {
		onSave(groupNo, reactionProcessVessel)
	}

	return (
		<Row>
			<Col md={3}>
				<VesselableFormSection
					onChange={setReactionProcessVessel}
					reactionProcessVessel={reactionProcessVessel} />

			</Col>
			<Col md={6}>
				{group.map(vial =>
					<Button className="circle-button m-1"
						disabled
						style={{ backgroundColor: colorStyle }}>
						{vial}
					</Button>
				)}
			</Col>
			<Col md={1}>
				<Button
					onClick={createEvaporation}>Create Evaporation</Button>
			</Col>
		</Row >
	)
}

export default EvaporationGroupForm
