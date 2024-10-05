import React from 'react'
import { FormGroup, Label, Row } from 'reactstrap'
import Select from "react-select";

import { SolventRatioListEntry } from './SolventRatioListEntry';
import { SolventAmountListEntry } from './SolventAmountListEntry';

import MetricsDecorator from '../../decorators/MetricsDecorator';

const SolventListForm = ({
	label = 'Solvent',
	solvents = [],
	solventOptions,
	setSolvents,
	unitTypeName = 'RATIO'
}) => {

	const solventIds = solvents.map((solvent) => solvent.value)
	const selectableSolventOptions = solventOptions.filter(item => !solventIds.includes(item.value))

	const addSolvent = (solvent) => setSolvents(solvents.concat({ ...solvent, ratio: 1 }))

	const removeSolvent = (idx) => () => setSolvents(solvents.toSpliced(idx, 1))

	const handleSetAmount = (name, index) => (value) => {
		setSolvents(solvents.toSpliced(index, 1, { ...solvents[index], [name]: value }))
	}

	const solventListEntry = (solvent, idx) => {
		return unitTypeName === 'RATIO' ? (<SolventRatioListEntry
			solvent={solvent}
			index={idx}
			onRemoveSolvent={removeSolvent}
			onSetAmount={handleSetAmount('ratio', idx)}
			key={solvent.id + '-' + idx}
		/>) :
			(<SolventAmountListEntry
				solvent={solvent}
				index={idx}
				onRemoveSolvent={removeSolvent}
				onSetAmount={handleSetAmount('amount', idx)}
				key={solvent.id + '-' + idx}
			/>)
	}

	return (
		<FormGroup className="mb-2">
			<div className="filtration-step-form__solvent-list">
				<Row className='gx-2 pb-1 px-2 mx-0'>
					<Label className='col-9 col-form-label'>{label}</Label>
					<Label className='col-3 col-form-label'>{MetricsDecorator.unitLabel(unitTypeName)}</Label>
				</Row>
				{solvents.map((solvent, idx) => solventListEntry(solvent, idx))}
			</div>
			<Select
				placeholder={'Add ' + label}
				className="react-select--overwrite filtration-step-form__solvent-select"
				classNamePrefix="react-select"
				name="purification_solvent_solvent_ids"
				options={selectableSolventOptions}
				value={''}
				onChange={selectedOption => addSolvent(selectedOption)}
			/>
		</FormGroup>
	)
}

export default SolventListForm
