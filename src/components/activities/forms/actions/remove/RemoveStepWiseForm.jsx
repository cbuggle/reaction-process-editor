import React from 'react'

import { Label } from 'reactstrap';

import RemoveConditionsForm from './RemoveConditionsForm';
import RemoveLimitsFormSet from './RemoveLimitsFormSet';
import RemoveFromMethodStepForm from './RemoveFromMethodStepForm';

import withActivitySteps from '../../../../utilities/WithActivitySteps'
import FormSection from '../../../../utilities/FormSection';

const RemoveStepWiseForm = ({
	workup,
	preconditions,
	onWorkupChange,
}) => {

	const handleWorkupChange = (name) => (value) => {
		onWorkupChange({ name: name, value: value })
	}


	const handleChangeStarterConditions = (value) => {
		// TODO: Restrict condition hash to actually required attributes only. (temp, press, duration)
		onWorkupChange({ name: 'starter_conditions', value: value.data })
	}

	return (
		<>

			<RemoveFromMethodStepForm
				label={"Continuous/Starter"}
				workup={workup.starter_conditions || preconditions}
				onSave={handleChangeStarterConditions}
			/>
			<RemoveLimitsFormSet limits={workup.limits} preconditions={preconditions} onChange={handleWorkupChange('limits')} />
		</>
	);
};

export default withActivitySteps(RemoveStepWiseForm, 'remove_steps')



