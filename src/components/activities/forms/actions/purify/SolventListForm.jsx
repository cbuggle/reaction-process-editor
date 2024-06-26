import React from 'react'
import { FormGroup, Label, Row } from 'reactstrap'
import Select from "react-select";

import OptionsDecorator from '../../../../../decorators/OptionsDecorator';
import { SolventListEntry } from './SolventListEntry';

const SolventListForm = ({
	label = 'Solvent',
	solvents,
	solventOptions,
	setSolvents
}) => {

	const solventIds = solvents.map((solvent) => solvent.value)
	const selectableSolventOptions = solventOptions.filter(item => !solventIds.includes(item.value))

	const addSolvent = (solvent) => setSolvents(solvents.concat({ ...solvent, ratio: 1 }))

	const removeSolvent = (idx) => () => setSolvents(solvents.toSpliced(idx, 1))

	const handleSetRatio = (index) => (ratio) => {
		setSolvents(solvents.toSpliced(index, 1, { ...solvents[index], ratio: ratio }))
	}

	return (
		<FormGroup className="mb-2">
			<div className="filtration-step-form__solvent-list">
				<Row className='gx-2 pb-1 px-2 mx-0'>
					<Label className='col-9 col-form-label'>{label}</Label>
					<Label className='col-3 col-form-label'>Ratio</Label>
				</Row>
				{solvents.map((solvent, idx) =>
					<SolventListEntry
						label={solvent.label}
						ratio={solvent.ratio}
						index={idx}
						onRemoveSolvent={removeSolvent}
						onSetRatio={handleSetRatio(idx)}
						key={solvent.id + '-' + idx}
					/>
				)}
			</div>
			<Select
				placeholder={'Add ' + label}
				className="react-select--overwrite filtration-step-form__solvent-select"
				classNamePrefix="react-select"
				name="purify_solvent_solvent_ids"
				options={selectableSolventOptions}
				value={''}
				onChange={selectedOption => addSolvent(selectedOption)}
			/>
		</FormGroup>
	)
}

export default SolventListForm
