import React from 'react'

import RemoveConditionsStepForm from './RemoveFromMethodStepForm'
import RemoveLimitsFormSet from './RemoveLimitsFormSet';

import withActivitySteps from '../../../../utilities/WithActivitySteps'

const RemoveStepWiseForm = ({
	workup,
	preconditions,
	onWorkupChange,
	showNewStepForm,
	addStep,
	handleSaveStep,
	handleCancelStep,
	handleDeleteStep
}) => {

	const handleChangeStarterConditions = (name) => {
		console.log("handleChangeStarterConditions")
		console.log(name)
		// console.log(value)

	}

	const handleWorkupChange = (name) => (value) => {
		onWorkupChange({ name: name, value: value })
	}

	console.log("RemoveStepWiseForm workup")
	console.log(workup)
	return (
		<>
			<RemoveConditionsStepForm
				label={"Continuous/Starter"}
				workup={workup.starter_conditions || preconditions}
				onSave={handleChangeStarterConditions}
				onCancel={handleCancelStep} />
			<RemoveLimitsFormSet limits={workup.limits} preconditions={preconditions} onChange={handleWorkupChange('limits')} />

		</>
	);
};

export default withActivitySteps(RemoveStepWiseForm, 'remove_steps')



