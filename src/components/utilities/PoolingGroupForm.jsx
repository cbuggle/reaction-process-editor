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


const PoolingGroupForm = ({ vials, group, allVials, vialPlateColumns, claimVial }) => {

	const selectOptions = useContext(SelectOptions).FORMS.POOLING_GROUP;
	const [reactionProcessVessel, setReactionProcessVessel] = useState({})
	const [activityCreateType, setActivityCreateType] = useState('EVAPORATION')

	const [{ isOver, }, dropRef] = useDrop(() => ({
		accept: DndItemTypes.VIALBUTTON,
		drop: (monitor) => dropItem(monitor),
		collect: (monitor) => ({
			isOver: monitor.isOver() && monitor.canDrop(),
			getItem: monitor.getItem(),
		}),
	}), [])

	const dropItem = (monitor) => {
		claimVial(group, monitor.vial)
	}

	const dropClassName = () => {
		return isOver ? "bg bg-success bg-opacity-25" : ""
	}

	const renderBreak = (idx) => {
		if (idx % vialPlateColumns === vialPlateColumns - 1) { return (<br />) }
	}

	const renderVialPlate = () => {
		return allVials.map((vial, idx) => {
			return (
				<>
					<VialButton
						key={"vial-button-" + vial.id}
						vial={vials.find(v => v === vial)}
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
			vials.map(vial =>
				<VialButton
					vial={vial}
					onClick={(event => { })} />
			))

	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div ref={dropRef} className={dropClassName()}>
				<Row className={"border border-top-5"}>
					<Col md={4}>
						{renderVialPlate()}
					</Col>
					{/* <Col md={4}>
						{renderVialLine()}
					</Col> */}
					<Col md={2}>
						<Label check >
							Followup Action
						</Label>
						<Select
							className="react-select--overwrite"
							classNamePrefix="react-select"
							name="activityType"
							options={selectOptions.activity_types}
							value={activityCreateType}
							onChange={setActivityCreateType}
						/>
						{/* <Select
							className="mx-3"
							type="checkbox"
							checked={throwGroupAway}
							onChange={(event) => setThrowGroupAway(event.target.checked)}
						/> */}
					</Col>
					<Col md={4}>
						<VesselableFormSection
							onChange={setReactionProcessVessel}
							reactionProcessVessel={reactionProcessVessel} />
					</Col>
				</Row >
			</div>
		</DndProvider>
	)
}

export default PoolingGroupForm
