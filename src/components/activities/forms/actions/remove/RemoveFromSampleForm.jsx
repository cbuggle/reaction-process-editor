import React, { useContext } from 'react'

import { FormGroup } from 'reactstrap'

import FormSection from '../../../../utilities/FormSection'

import SolventListForm from '../../../../utilities/SolventListForm'
import Select from 'react-select'

import MetricsInput from '../../../../utilities/MetricsInput'
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup'

import { StepSelectOptions } from '../../../../../contexts/StepSelectOptions'
import { SelectOptions } from '../../../../../contexts/SelectOptions'

const RemoveFromSampleForm = ({ workup, onWorkupChange }) => {
	const stepSelectOptions = useContext(StepSelectOptions);
	const selectOptions = useContext(SelectOptions);
	const removableSamplesOptions = stepSelectOptions.removable_samples[workup.origin_type]

	const handleWorkupChange = (name) => (value) => { onWorkupChange({ name: name, value: value }) }

	const handleSampleChange = (sample) => {

		onWorkupChange({ name: "sample", value: sample });
		onWorkupChange({ name: "solvents", value: sample.solvents });
		onWorkupChange({ name: "solvents_amount", value: sample.solvents_amount });
	}

	const handleChangeAmount = (amount) => {
		onWorkupChange({ name: 'slovents_amount', value: amount })
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
			<FormSection>
				<FormGroup>
					<SolventListForm
						label={'Solvent'}
						solvents={workup.solvents}
						solventOptions={selectOptions.materials.DIVERSE_SOLVENT}
						setSolvents={handleWorkupChange('solvents')} />
				</FormGroup>
				<FormGroup>
					<MetricsInput
						metricName={"VOLUME"}
						amount={workup.solvents_amount}
						onChange={handleChangeAmount}
					/>
				</FormGroup>
			</FormSection>
		</>
	)
}

export default RemoveFromSampleForm
