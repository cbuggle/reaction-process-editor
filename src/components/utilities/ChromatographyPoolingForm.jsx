import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Row, Col, Label } from 'reactstrap'

import FormButtons from './FormButtons'
import NumericalInput from './NumericalInput'
import PoolingGroupForm from './PoolingGroupForm'
import VialButton from './VialButton'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

const ChromatographyPoolingForm = ({ activity, onResolvePooling, onCancel }) => {
	const api = useReactionsFetcher()

	const [currentTray, setCurrentTray] = useState(1)
	const trayCount = activity.automation_response.length

	let allVials = []
	activity.automation_response.forEach(ar => allVials = allVials.concat(ar.vials))

	const automationResponse = activity.automation_response[currentTray - 1] || []
	const tray_type = automationResponse?.['tray_type'] || "No tray_type defined, automation response defect?"
	// const vials_list = automationResponse?.['vials'] || [[]]
	const vialPlateColumns = automationResponse?.['vial_columns'] || 5
	const vialsPerTray = 15 // TODO extract this from tray_type

	const [vials, setVials] = useState(allVials.map(vial => { return { id: vial, groupId: 0 } }))
	const [vessels, setVessels] = useState([])
	const [followUpActions, setFollowUpActions] = useState([])
	const [groupCount, setGroupCount] = useState(1)

	const [renderCountToForciblyUpdateVialsStateInFunctionClaimVial, setRenderCount] = useState(0);

	useEffect(() => {
		let newVials = vials.map(vial => { return { ...vial, groupId: vial.groupId > (groupCount - 1) ? 0 : vial.groupId } })

		setVials(newVials)
		setRenderCount(renderCountToForciblyUpdateVialsStateInFunctionClaimVial + 1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupCount]);

	const handleSave = () => {
		onResolvePooling()
		createPoolingActivities()
	}

	const createPoolingActivities = () => {
		api.appendPoolingsToActivity(activity, poolingGroups())
	}

	const poolingGroups = () => {
		let groups = []
		for (let currentGroup = 0; currentGroup < groupCount; currentGroup++) {
			let vialsInGroup = vials.filter(vial => vial.id && (vial.groupId === currentGroup))
			groups.push({
				vessel: vessels[currentGroup],
				vials: vialsInGroup,
				followUpAction: followUpActions[currentGroup] || { value: 'EVAPORATION', label: 'Evaporation' }
			})
		}
		return groups
	}

	const handleVialGroupChange = (idx) => (newGroupId) => () => {
		if (groupCount === 1) setGroupCount(2)

		newGroupId ||= vials[idx].groupId + 1
		if (newGroupId >= groupCount && groupCount > 1) { newGroupId = 0 }
		setVials(vials.toSpliced(idx, 1, { ...vials[idx], groupId: newGroupId }))

		setRenderCount(renderCountToForciblyUpdateVialsStateInFunctionClaimVial + 1)
	}

	// const handlePoolingGroupChange = (idx) => (newGroup) => {
	// 	let newPoolingGroups = poolingGroups
	// 	newPoolingGroups[idx] = newGroup
	// 	setPoolingGroups(newPoolingGroups)

	// }
	const handlePoolingGroupVessel = (idx) => (newVessel) => {
		let newVessels = { ...vessels }
		newVessels[idx] = newVessel
		setVessels(newVessels)
		setRenderCount(renderCountToForciblyUpdateVialsStateInFunctionClaimVial + 1)
	}

	const handlefollowUpAction = (idx) => (newAction) => {
		let newfollowUpActions = { ...followUpActions }
		newfollowUpActions[idx] = newAction
		setFollowUpActions(newfollowUpActions)
		setRenderCount(renderCountToForciblyUpdateVialsStateInFunctionClaimVial + 1)

	}

	const renderPoolingGroup = (groupId) => {
		let groupVials = vials.filter(vial => vial.id && vial.groupId === groupId)
		let poolingGroup = poolingGroups()[groupId]
		return (
			<PoolingGroupForm
				key={"pooling-group-form" + groupId + "-" + renderCountToForciblyUpdateVialsStateInFunctionClaimVial}
				poolingGroup={poolingGroup}
				vials={groupVials}
				groupId={groupId}
				claimVial={claimVial(groupId)}
				allVials={vials}
				vialPlateColumns={vialPlateColumns}
				// onChange={handlePoolingGroupChange(groupId)}
				setVessel={handlePoolingGroupVessel(groupId)}
				setFollowUpAction={handlefollowUpAction(groupId)}
			/>
		)
	}

	const claimVial = (groupId) => (vial) => {
		let idx = vials.findIndex(v => v.id === vial.id)
		if (idx !== -1) {
			setVials(vials.toSpliced(idx, 1, { ...vials[idx], groupId: groupId }))
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

	const renderCurrentVialPlate = (trayNo) => {
		const firstVial = 0 + (trayNo - 1) * vialsPerTray
		const lastVial = firstVial + vialsPerTray

		return vials.slice(firstVial, lastVial).map((vial, idx) => {
			return (
				<>
					<VialButton
						key={"vial-button-" + vial.id}
						vial={vial}
						onClick={handleVialGroupChange(firstVial + idx)()}
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
					<Label>Pooling Groups</Label>
					<NumericalInput
						value={groupCount}
						step={1}
						min={1}
						size={8}
						onChange={setGroupCount}
						className='form-control'
					/>
				</Col>

				<Col md={2} className={'p-3'}>
					<div className={'p-3'}>

						{tray_type}
					</div>
					<NumericalInput

						value={currentTray}
						step={1}
						min={1}
						max={trayCount}
						size={8}
						onChange={setCurrentTray}
						className='form-control'
					/>
					{/* <div className={'p-3'}> */}
					{"Tray No. " + currentTray + "/" + trayCount}
					{/* </div> */}
				</Col>

				<Col md={1}>
				</Col>
				<Col md={5}>
					<DndProvider backend={HTML5Backend}>
						{renderCurrentVialPlate(currentTray)}
					</DndProvider>
				</Col>
				<Col md={1}>
					<FormButtons
						onSave={handleSave}
						onCancel={onCancel}
					/>
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
