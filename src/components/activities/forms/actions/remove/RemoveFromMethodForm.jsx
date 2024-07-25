import React from 'react'

import { Label } from 'reactstrap'

import RemoveFromMethodStepForm from './RemoveFromMethodStepForm'

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
				onCancel={handleCancelStep} />

			{activitySteps.map((step, idx) =>
				<RemoveFromMethodStepForm
					key={'remove-step-' + idx + '-' + activitySteps.length}
					index={idx}
					workup={step}
					onSave={handleSaveStep}
					onCancel={handleCancelStep}
					onDelete={handleDeleteStep}
					canDelete={true}
				/>
			)}
			{showNewStepForm &&
				<RemoveFromMethodStepForm
					index={activitySteps.length}
					workup={activitySteps?.at(-1)}
					initialShowForm={true}
					onSave={handleSaveStep}
					onCancel={handleCancelStep}
					onDelete={handleDeleteStep}
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
