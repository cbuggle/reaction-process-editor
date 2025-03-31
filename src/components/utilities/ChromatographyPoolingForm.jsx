import React, { useContext, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Row, Col } from 'reactstrap'

import FormButtons from './FormButtons'
import NumericalInput from './NumericalInput'
import PoolingGroupForm from './PoolingGroupForm'
import VialButton from './VialButton'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

const ChromatographyPoolingForm = ({ activity, onResolvePooling, onCancel }) => {
	const api = useReactionsFetcher()

	const automationResponse = activity.automation_response
	const tray_type = automationResponse?.['tray_type'] || "No tray_type defined, automation response defect?"
	const vials_list = automationResponse?.['vials'] || [[]]
	const vialPlateColumns = automationResponse?.['vial_columns'] || 1

	const [currentTray, setCurrentTray] = useState(0)

	const [vials, setVials] = useState(vials_list.map(vial => { return { id: vial, group: 0 } }))
	const [vessels, setVessels] = useState({})
	const [groupCount, setGroupCount] = useState(1)

	const [renderCountToForciblyUpdateVialsStateInFunctionClaimVial, setRenderCount] = useState(0);


	useEffect(() => {
		let newVials = vials.map(vial => { return { ...vial, group: vial.group > (groupCount - 1) ? 0 : vial.group } })

		setVials(newVials)
		setRenderCount(renderCountToForciblyUpdateVialsStateInFunctionClaimVial + 1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupCount]);

	const handleSave = () => {
		onResolvePooling()
		createPoolingActivities()
	}

	const createPoolingActivities = (reactionProcessVessel) => {
		api.appendPoolingsToActivity(activity, poolingGroups())
	}

	const poolingGroups = () => {
		let groups = []
		for (let currentGroup = 0; currentGroup < groupCount; currentGroup++) {
			let vialsInGroup = vials.filter(vial => vial.group === currentGroup)
			groups.push({ vessel: {}, vials: vialsInGroup, activity_name: "ACTIVITY_NAME" }) // Todo fetch fron subform
		}
		return groups
	}

	const handleVialGroupChange = (idx) => (newGroup) => () => {
		if (groupCount === 1) setGroupCount(2)

		newGroup ||= vials[idx].group + 1
		if (newGroup >= groupCount && groupCount > 1) { newGroup = 0 }
		setVials(vials.toSpliced(idx, 1, { ...vials[idx], group: newGroup }))

		setRenderCount(renderCountToForciblyUpdateVialsStateInFunctionClaimVial + 1)
	}


	const renderPoolingGroup = (group) => {
		let groupVials = vials.filter(vial => vial.id && vial.group === group)
		return (
			<PoolingGroupForm
				key={"evaporation-group-form" + group + "-" + renderCountToForciblyUpdateVialsStateInFunctionClaimVial}
				vials={groupVials}
				group={group}
				claimVial={claimVial}
				allVials={vials}
				vialPlateColumns={vialPlateColumns}
			/>
		)
	}

	const claimVial = (group, vial) => {
		let idx = vials.findIndex(v => v.id === vial.id)
		if (idx !== -1) {
			setVials(vials.toSpliced(idx, 1, { ...vials[idx], group: group }))
		}
		setRenderCount(renderCountToForciblyUpdateVialsStateInFunctionClaimVial + 1)
	}

	const renderPoolingGroups = () => {
		return ([...Array(groupCount)].map((_, i) => (
			renderPoolingGroup(i)
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
						onClick={handleVialGroupChange(idx)()}
					/>
					{renderBreak(idx)}
				</>
			)
		})
	}

	const renderVialGroupCounter = () => {
		return (
			<Row className='gx-2 mb-5'>
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
				<Col md={2}>
					Pooling Groups
				</Col>
				<Col md={2}>{tray_type}
				</Col>

				<Col md={6}>
					<DndProvider backend={HTML5Backend}>
						{renderVialPlate()}
					</DndProvider>
				</Col>
			</Row >
		)
	}

	return (
		<>
			{renderVialGroupCounter()}
			{renderPoolingGroups()}
			<FormButtons
				onSave={handleSave}
				onCancel={onCancel}
			/>
		</>
	)
}


export default ChromatographyPoolingForm
