import React, { useContext } from 'react'

import Select from 'react-select'

import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup'

import { StepSelectOptions } from '../../../../../contexts/StepSelectOptions'
import FormSection from '../../../../utilities/FormSection';

const RemoveFromReactionForm = ({ workup, onWorkupChange }) => {
	const stepSelectOptions = useContext(StepSelectOptions);
	const removableSamplesOptions = stepSelectOptions.removable_samples[workup.origin_type]

	// const handleWorkupChange = (name) => (value) => {
	// 	onWorkupChange({ name: name, value: value })
	// }

	const handleSampleChange = (samples) => {
		console.log("handleSampleChange")
		console.log(workup)
		console.log(samples)
		onWorkupChange({ name: "samples", value: samples });
		// onWorkupChange({ name: "solvents", value: samples.solvents });
		// onWorkupChange({ name: "solvents_amount", value: samples.solvents_amount });
	}

	return (
		<FormSection>
			{console.log("Rempove Sample select workup")}
			{console.log(workup)}
			<SingleLineFormGroup label={'Samples'}>
				<Select
					isMulti
					isClearable={false}
					className="react-select--overwrite"
					classNamePrefix="react-select"
					name="samples"
					options={removableSamplesOptions}
					selected={workup.samples}
					// value={workup.samples}
					onChange={handleSampleChange}
				/>
			</SingleLineFormGroup>
		</FormSection>
	);
};

export default RemoveFromReactionForm
