import React, { useContext } from 'react'

import { FormGroup } from 'reactstrap'

import FormSection from '../../../../utilities/FormSection'

import Select from 'react-select'

import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup'

import { StepSelectOptions } from '../../../../../contexts/StepSelectOptions'
import RemoveSolventListFormSection from './RemoveSolventListFormSection'

const RemoveFromSampleForm = ({ workup, onWorkupChange }) => {
	const stepSelectOptions = useContext(StepSelectOptions);
	const removableSamplesOptions = stepSelectOptions.removable_samples[workup.origin_type]

	const handleSampleChange = (sample) => {

		onWorkupChange({ name: "sample", value: sample });
		onWorkupChange({ name: "solvents", value: sample.solvents });
		onWorkupChange({ name: "solvents_amount", value: sample.solvents_amount });
	}


	return (
		<>
			<FormSection type='action'>
				<SingleLineFormGroup label={'Sample'}>
					<Select
						className="react-select--overwrite"
						classNamePrefix="react-select"
						name="samples"
						options={removableSamplesOptions}
						value={workup.sample}
						onChange={handleSampleChange}
					/>
				</SingleLineFormGroup>
			</FormSection>
			<RemoveSolventListFormSection workup={workup} onWorkupChange={onWorkupChange} />
		</>
	)
}

export default RemoveFromSampleForm
