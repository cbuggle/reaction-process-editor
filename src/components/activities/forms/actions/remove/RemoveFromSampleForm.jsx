import React, { useContext } from 'react'

import { FormGroup } from 'reactstrap'

import FormSection from '../../../../utilities/FormSection'

import SolventListForm from '../../../../utilities/SolventListForm'
import Select from 'react-select'

import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup'

import { StepSelectOptions } from '../../../../../contexts/StepSelectOptions'
import { SelectOptions } from '../../../../../contexts/SelectOptions'

const RemoveFromSampleForm = ({ workup, onWorkupChange }) => {
	const stepSelectOptions = useContext(StepSelectOptions);
	const selectOptions = useContext(SelectOptions);
	const removableSamplesOptions = stepSelectOptions.removable_samples[workup.origin_type]

	const handleWorkupChange = (name) => (value) => { onWorkupChange({ name: name, value: value }) }

	return (
		<FormSection type='action'>
			<SingleLineFormGroup label={'Sample'}>
				<Select
					className="react-select--overwrite"
					classNamePrefix="react-select"
					name="samples"
					options={removableSamplesOptions}
					value={workup.sample}
					onChange={handleWorkupChange('sample')}
				/>
			</SingleLineFormGroup>
			<FormGroup>
				<SolventListForm
					label={'Extra Solvent'}
					unitTypeName={'ml'}
					solvents={workup.solvents}
					solventOptions={selectOptions.materials.DIVERSE_SOLVENT}
					setSolvents={handleWorkupChange('solvents')} />
			</FormGroup>
		</FormSection>
	)
}

export default RemoveFromSampleForm
