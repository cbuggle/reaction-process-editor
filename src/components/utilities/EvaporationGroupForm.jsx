import React, { useState } from 'react'
import { Label, Input, Row, Col } from 'reactstrap'
import VesselableFormSection from '../vesselables/VesselableFormSection'

import VialButton from './VialButton'

const EvaporationGroupForm = ({ group, groupNo, onChange }) => {

	const [reactionProcessVessel, setReactionProcessVessel] = useState({})
	const [useGroup, setUseGroup] = useState(true)

	return (
		<Row>
			<Col md={1}>
				<Label check>
					Use Group
				</Label>
				<Input
					type="checkbox"
					checked={useGroup}
					onChange={(event) => setUseGroup(event.target.checked)}
				/>
			</Col>
			<Col md={4}>
				<VesselableFormSection
					onChange={setReactionProcessVessel}
					reactionProcessVessel={reactionProcessVessel} />
			</Col>
			<Col md={6}>
				{group.map(vial =>
					<VialButton
						vial={vial}
						onClick={(event => { })} />
				)}
			</Col>
		</Row >
	)
}

export default EvaporationGroupForm
