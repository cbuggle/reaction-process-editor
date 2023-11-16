import React from 'react'
import { FormGroup, Label, Row } from 'reactstrap'
import Select from "react-select";

import { SolventListEntry } from './SolventListEntry';

const SolventListForm = ({
	solvents,
	solventOptions,
	setSolvents
}) => {

	const solventIds = solvents.map((solvent) => solvent.id)
	const selectableSolventOptions = solventOptions.filter(item => !solventIds.includes(item.value))

	const addSolvent = (solventId) => setSolvents(solvents.concat({ id: solventId, ratio: 1 }))

	const removeSolvent = (idx) => () => setSolvents(solvents.toSpliced(idx, 1))

	const handleSetRatio = (ratio) => {
		setSolvents(solvents.toSpliced(
			ratio.index,
			1,
			{ id: solvents[ratio.index].id, ratio: ratio.value }
		))
	}

	return (
		<FormGroup className="mb-2">
			<div className="filtration-step-form__solvent-list">
				<Row className='gx-2 pb-1 px-2 mx-0'>
					<Label className='col-9 col-form-label'>Solvent</Label>
					<Label className='col-3 col-form-label'>Ratio</Label>
				</Row>
				{solvents.map((solvent, idx) =>
					<SolventListEntry
						label={solventOptions.find(option => solvent.id === option.value).label}
						ratio={solvent.ratio}
						index={idx}
						onRemoveSolvent={removeSolvent}
						onSetRatio={handleSetRatio}
						key={solvent.id + '-' + idx}
					/>
				)}
			</div>
			<Select
				placeholder={'Add Solvent'}
				className="react-select--overwrite filtration-step-form__solvent-select"
				classNamePrefix="react-select"
				name="purify_solvent_solvent_ids"
				options={selectableSolventOptions}
				value={''}
				onChange={selectedOption => addSolvent(selectedOption.value)}
			/>
		</FormGroup>
	)
}

export default SolventListForm
