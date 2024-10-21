import React from 'react'

import RemoveLimitsFormSet from './RemoveLimitsFormSet';
import RemoveFromMethodStepForm from './RemoveFromMethodStepForm';

import withActivitySteps from '../../../../utilities/WithActivitySteps'

const RemoveStepWiseForm = ({
	workup,
	preconditions,
	onWorkupChange,
	onCancelStep
}) => {

	const handleWorkupChange = (name) => (value) => {
		onWorkupChange({ name: name, value: value })
	}

	const handleChangeStarterConditions = (value) => {
		// TODO: Restrict condition hash to actually required attributes only. (temp, press, duration)
		onWorkupChange({ name: 'starter_conditions', value: value })
	}

	return (
		<>
			<RemoveFromMethodStepForm
				label={"Continuous/Starter"}
				workup={workup.starter_conditions || preconditions}
				onSave={handleChangeStarterConditions}
				onCancel={onCancelStep}
			/>
			<RemoveLimitsFormSet
				limits={workup.limits}
				preconditions={workup.starter_conditions || preconditions}
				onSave={handleWorkupChange('limits')} />
		</>
	);
};

export default withActivitySteps(RemoveStepWiseForm, 'remove_steps')
