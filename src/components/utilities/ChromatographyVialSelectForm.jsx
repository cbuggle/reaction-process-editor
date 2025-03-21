import React, { useState } from 'react'
import FormButtons from './FormButtons'
import { Button, Row, Col } from 'reactstrap'
import NumericalInput from './NumericalInput'
import VialSelectDecorator from '../../decorators/VialSelectDecorator'


const ChromatographyVialSelectForm = ({ activity, closeForm }) => {
	const automationResponse = activity.automation_response
	const tray_type = automationResponse['tray_type']
	const vialPlate = automationResponse['vials']

	const initialMatrix = [...Array(vialPlate.length)].map(_ => Array(vialPlate[0].length).fill(0))

	const [poolingCounter, setPoolingCounter] = useState(1)
	const [poolingGroupMatrix, setPoolingGroupMatrix] = useState(initialMatrix)

	const handleSave = () => { closeForm() }

	const assignVial = (vial, rowNo, colNo) => {
		const newPoolingGroup = (poolingGroupMatrix[rowNo][colNo] + 1) % poolingCounter
		console.log("assigning Vial x: " + rowNo + 'y: ' + colNo + "id: " + vial + "poolingG" + newPoolingGroup)

		let newPoolingGroupMatrix = poolingGroupMatrix
		newPoolingGroupMatrix[rowNo][colNo] = newPoolingGroup
		setPoolingGroupMatrix(newPoolingGroupMatrix)
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
		const handleClick = () => assignVial(vial, rowNo, colNo)

		const color = VialSelectDecorator.colorFor(poolingGroupMatrix[rowNo][colNo])

		return (
			<Button className="circle-button m-2"
				disabled={!vial}
				style={{ backgroundColor: color }}
				onClick={handleClick}>
				{vial}
			</Button>
		)
	}

	const renderVialGroupCounter = () => {
		return (
			<Row className='gx-2 mb-5'>
				<Col md={1}>{tray_type}</Col>
				<Col md={2}>Pooling Groups</Col>
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
			</Row >
		)
	}

	const renderPoolingGroups = () => {

	}

	const poolingGroupOfVial = (vial) => {

	}

	return (
		<>
			{renderVialGroupCounter()}
			{renderVialPlate()}
			<FormButtons
				onSave={handleSave}
				onCancel={closeForm}
			/>
		</>
	)
}

export default ChromatographyVialSelectForm
