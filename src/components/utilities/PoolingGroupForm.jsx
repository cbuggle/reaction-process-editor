import React, { useContext, useState } from 'react'
import Select from 'react-select';
import { useDrop } from 'react-dnd'
import { DndItemTypes } from '../../constants/dndItemTypes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Label, Row, Col } from 'reactstrap'
import VesselableFormSection from '../vesselables/VesselableFormSection'

import VialButton from './VialButton'

import { SelectOptions } from "../../contexts/SelectOptions";


const PoolingGroupForm = ({ poolingGroup, groupId, allVials, vialPlateColumns, claimVial, setVessel, setFollowUpAction }) => {
	const selectOptions = useContext(SelectOptions).FORMS.POOLING_GROUP;

	const [{ isOver, }, dropRef] = useDrop(() => ({
		accept: DndItemTypes.VIALBUTTON,
		drop: (monitor) => dropItem(monitor),
		collect: (monitor) => ({
			isOver: monitor.isOver() && monitor.canDrop(),
			getItem: monitor.getItem(),
		}),
	}), [])

	const dropItem = (monitor) => {
		claimVial(monitor.vial)
	}

	const dropClassName = () => {
		return isOver ? " bg bg-success bg-opacity-25 " : ""
	}

	const groupClassName = () => {
		return " bg bg-primary bg-opacity-25 "
	}

	const renderBreak = (idx) => {
		if (idx % vialPlateColumns === vialPlateColumns - 1) { return (<br />) }
	}

	const renderVialPlate = () => {
		// works but users decided for VialLine display
		return allVials.map((currentPlateVial, idx) => {
			return (
				<>
					<VialButton
						key={"vial-button-" + currentPlateVial.id}
						vial={poolingGroup.vials.find(vial => vial.id === currentPlateVial.id)}
						onClick={event => { }}
						disabled
					/>
					{renderBreak(idx)}
				</>
			)
		})
	}

	const renderVialLine = () => {
		return (
			poolingGroup.vials.map(vial =>
				<VialButton
					vial={vial}
					onClick={(event => { })} />
			))

	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div ref={dropRef} className={"border border-top-1 mt-3 " + dropClassName() + groupClassName()}>
				<Row className={"pt-4 ps-4"}>
					<Col md={4} className="border-end">
						<span className="pe-5">
							Followup Action
						</span>
						<Label className="ps-5">
							{'Pooling Group ' + (groupId + 1)}
						</Label>
						<Select
							className="react-select--overwrite"
							classNamePrefix="react-select"
							name="activityType"
							options={selectOptions.followup_action_types}
							value={poolingGroup.followUpAction}
							onChange={setFollowUpAction}
						/>
						<VesselableFormSection
							onChange={setVessel}
							reactionProcessVessel={poolingGroup.vessel || {}} />
					</Col>
					<Col md={8}>
						{renderVialLine()}
					</Col>
				</Row >
			</div>
		</DndProvider>
	)
}

export default PoolingGroupForm
