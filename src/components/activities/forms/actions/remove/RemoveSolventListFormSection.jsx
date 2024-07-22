import React, { useContext } from 'react'

import { FormGroup } from 'reactstrap'
import FormSection from '../../../../utilities/FormSection'

import MetricsInput from '../../../../utilities/MetricsInput'
import SolventListForm from '../../../../utilities/SolventListForm'
import { SelectOptions } from '../../../../../contexts/SelectOptions'

const RemoveSolventListFormSection = ({ workup, onWorkupChange }) => {

	const selectOptions = useContext(SelectOptions)

	const handleWorkupChange = (name) => (value) => { onWorkupChange({ name: name, value: value }) }

	const handleChangeAmount = (amount) => {
		onWorkupChange({ name: 'solvents_amount', value: amount })
	}

	return (
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
	)
}

export default RemoveSolventListFormSection
