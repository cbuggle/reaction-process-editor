import React, { useContext } from 'react'

import Select from 'react-select'

import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup'

import { StepSelectOptions } from '../../../../../contexts/StepSelectOptions'
import FormSection from '../../../../utilities/FormSection';
import RemoveSolventListFormSection from './RemoveSolventListFormSection';

const RemoveFromReactionForm = ({ workup, onWorkupChange }) => {
	const stepSelectOptions = useContext(StepSelectOptions);
	const removableSamplesOptions = stepSelectOptions.removable_samples[workup.origin_type]

	const handleSampleChange = (samples) => {
		console.log("handleSampleChange")
		console.log(workup)
		console.log(samples)
		onWorkupChange({ name: "samples", value: samples });
		// onWorkupChange({ name: "solvents", value: samples.solvents });
		// onWorkupChange({ name: "solvents_amount", value: samples.solvents_amount });
	}

	return (
		<>
			<FormSection>
				<SingleLineFormGroup label={'Samples'}>
					<Select
						isMulti
						isClearable={false}
						className="react-select--overwrite"
						classNamePrefix="react-select"
						name="samples"
						options={removableSamplesOptions}
						value={workup.samples}
						onChange={handleSampleChange}
					/>
				</SingleLineFormGroup>
			</FormSection>
			<RemoveSolventListFormSection workup={workup} onWorkupChange={onWorkupChange} />
		</>
	);
};

export default RemoveFromReactionForm
