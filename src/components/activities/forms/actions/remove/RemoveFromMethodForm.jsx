import React from 'react'

import { Label } from 'reactstrap'

import RemoveFromMethodStepForm from './RemoveFromMethodStepForm'
import RemoveConditionsForm from './RemoveConditionsForm'

import FormSection from '../../../../utilities/FormSection'
import CreateButton from '../../../../utilities/CreateButton'

import withActivitySteps from '../../../../utilities/WithActivitySteps'

const RemoveFromMethodForm = ({
	workup,
	preconditions,
	onWorkupChange,
	activitySteps,
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

	console.log("RemoveFromMethodForm workup")
	console.log(workup)
	return (
		<>
			<RemoveFromMethodStepForm
				label={"Continuous/Starter"}
				workup={workup.starter_conditions || preconditions}
				onSave={handleChangeStarterConditions}
				onCancel={handleCancelStep} />

			{activitySteps.map((step, idx) =>
				<RemoveFromMethodStepForm
					index={idx}
					workup={step}
					onSave={handleSaveStep}
					onCancel={handleCancelStep}
					onDelete={handleDeleteStep}
					key={'remove-step-' + idx}
					canDelete={activitySteps.length > 1}
				/>
			)}
			{showNewStepForm &&
				<RemoveFromMethodStepForm
					index={activitySteps.length}
					workup={activitySteps?.at(-1)}
					onWorkupChange={onWorkupChange}
					initialShowForm={true}
					onSave={handleSaveStep}
					onCancel={handleCancelStep}
					onDelete={handleDeleteStep}
					canDelete={activitySteps.length > 1}
				/>
			}
			<FormSection type='action'>
				<CreateButton
					label='Limits Step'
					type='action'
					onClick={addStep}
					size='sm'
				/>
			</FormSection>
		</>
	);
};

export default withActivitySteps(RemoveFromMethodForm, 'remove_steps')



