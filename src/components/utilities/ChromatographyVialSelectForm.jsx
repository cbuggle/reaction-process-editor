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
	const vialPlate = automationResponse?.['vials'] || [[]]

	const initialMatrix = [...Array(vialPlate.length)].map(_ => Array(vialPlate[0].length).fill(0))

	const [poolingCounter, setPoolingCounter] = useState(1)
	const [poolingGroupMatrix, setPoolingGroupMatrix] = useState(initialMatrix)

	const [evaporationGroups, setEvaporationGroups] = useState([])

	const handleSave = () => {
		closeForm()
	}

	const createEvaporationActivity = (groupNo, reactionProcessVessel) => {
		api.appendEvaporationToActivity(activity, { vials: evaporationGroups[groupNo], vessel: reactionProcessVessel })
	}

	const assignVialGroup = (rowNo, colNo, newGroup) => {
		let newPoolingGroupMatrix = poolingGroupMatrix
		newPoolingGroupMatrix[rowNo][colNo] = newGroup
		setPoolingGroupMatrix(newPoolingGroupMatrix)
		recalculateEvaporationGroups()
	}

	const recalculateEvaporationGroups = () => {
		let newGroups = []
		for (let group = 0; group < poolingCounter; group++) {
			let newGroup = []
			for (let row = 0; row < vialPlate.length; row++) {
				for (let col = 0; col < vialPlate[0].length; col++) {
					if (poolingGroupMatrix[row][col] === group)
						vialPlate[row][col] && newGroup.push(vialPlate[row][col])
				}
			}
			newGroups.push(newGroup)
		}
		setEvaporationGroups(newGroups)
	}

	const renderEvaporationGroups = () => {
		return evaporationGroups.map((group, idx) => {
			return (
				<EvaporationGroupForm
					onSave={createEvaporationActivity}
					group={group}
					groupNo={idx} />
			)
		})
	}

	const renderVialPlate = () => {
		return vialPlate.map((row, idx) => renderVialRow(row, idx))
	}

	const renderVialRow = (vialRow, rowNo) => {
		return (
			<div>
				{vialRow.map((vial, colNo) => renderVialButton(vial, rowNo, colNo))}
			</div>
		)
	}

	const renderVialButton = (vial, rowNo, colNo) => {
		const handleClick = (newGroup) => assignVialGroup(rowNo, colNo, newGroup)
		return (
			<VialButton
				key={"vial-button-" + rowNo + "-" + colNo}
				vial={vial}
				onClick={handleClick}
				noOfGroups={poolingCounter}
			/>
		)
	}

	const renderVialGroupCounter = () => {
		return (
			<Row className='gx-2 mb-5'>
				<Col md={1}>{tray_type}</Col>
				<Col md={1}>
					<NumericalInput
						value={poolingCounter}
						step={1}
						min={1}
						size={8}
						onChange={setPoolingCounter}
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
