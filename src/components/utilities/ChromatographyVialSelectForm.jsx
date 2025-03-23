import React, { useState } from 'react'
import FormButtons from './FormButtons'
import { Row, Col } from 'reactstrap'
import NumericalInput from './NumericalInput'
import VialButton from './VialButton'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';
import EvaporationGroupForm from './EvaporationGroupForm'

const ChromatographyVialSelectForm = ({ activity, closeForm }) => {
	const api = useReactionsFetcher()

	const automationResponse = activity.automation_response
	const tray_type = automationResponse?.['tray_type'] || "No tray_type defined, automation response defect?"
	const vials_list = automationResponse?.['vials'] || [[]]
	const vialPlateColumns = automationResponse?.['vial_columns'] || 1

	const [vials, setVials] = useState(vials_list.map(vial => { return { id: vial, group: 0 } }))
	const [groupCount, setGroupCount] = useState(1)

	const handleSave = () => {
		createEvaporationActivities()
		closeForm()
	}

	const createEvaporationActivities = (reactionProcessVessel) => {
		api.appendEvaporationsToActivity(activity, { evaporationGroups: evaporationGroups(), vessel: reactionProcessVessel })
	}

	const evaporationGroups = () => {
		let groups = []
		for (let currentGroup = 0; currentGroup < groupCount; currentGroup++) {
			let newGroup = vials.filter(vial => vial.group === currentGroup)
			groups.push(newGroup)
		}
		return groups
	}

	const handleVialGroupChange = (idx) => () => {
		let newGroup = vials[idx].group + 1
		if (newGroup >= groupCount) { newGroup = 0 }
		setVials(vials.toSpliced(idx, 1, { ...vials[idx], group: newGroup }))
	}

	const renderEvaporationGroup = (group) => {
		let currentGroup = vials.filter(vial => vial.id && vial.group === group)
		return (
			< EvaporationGroupForm
				key={"evaporation-group-form" + group}
				group={currentGroup}
				groupNo={group} />
		)
	}

	const renderEvaporationGroups = () => {
		return ([...Array(groupCount)].map((_, i) => (
			renderEvaporationGroup(i)
		)))
	}

	const renderBreak = (idx) => {
		if (idx % vialPlateColumns === vialPlateColumns - 1) { return (<br />) }
	}

	const renderVialPlate = () => {
		return vials.map((vial, idx) => {
			return (
				<>
					<VialButton
						key={"vial-button-" + vial.id}
						vial={vial}
						onClick={handleVialGroupChange(idx)}
					/>
					{renderBreak(idx)}
				</>
			)
		})
	}

	const renderVialGroupCounter = () => {
		return (
			<Row className='gx-2 mb-5'>
				<Col md={1}>{tray_type}</Col>
				<Col md={1}>
					<NumericalInput
						value={groupCount}
						step={1}
						min={1}
						size={8}
						onChange={setGroupCount}
						className='form-control'
					/>
				</Col>
				<Col md={2}>Pooling Groups</Col>
			</Row >
		)
	}

	return (
		<>
			{renderVialGroupCounter()}
			{renderVialPlate()}
			{renderEvaporationGroups()}
			<FormButtons
				onSave={handleSave}
				onCancel={closeForm}
			/>
		</>
	)
}

export default ChromatographyVialSelectForm
