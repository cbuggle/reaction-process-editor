import React from 'react'

import RemoveConditionsFormSet from '../../formsets/RemoveConditionsFormSet'

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
	onSaveStep,
	onCancelStep,
	onDeleteStep
}) => {

	const handleChangeStarterConditions = (value) => {
		onWorkupChange({ name: 'starter_conditions', value: value })
	}

	return (
		<>
			<RemoveConditionsFormSet
				label={"Continuous/Starter"}
				workup={workup.starter_conditions || preconditions}
				onSave={handleChangeStarterConditions}
				onCancel={onCancelStep()} />

			{activitySteps.map((step, idx) =>
				<RemoveConditionsFormSet
					key={'remove-step-' + idx + '-' + activitySteps.length}
					label={'Limits Step ' + (idx + 1) + ":"}
					index={idx}
					preconditions={activitySteps.at(idx - 1) || workup.starter_conditions || preconditions}
					workup={step}
					onSave={onSaveStep(idx)}
					onCancel={onCancelStep(idx)}
					onDelete={onDeleteStep(idx)}
					canDelete={true}
				/>
			)}
			{showNewStepForm &&
				<RemoveConditionsFormSet
					key={'remove-step-' + (activitySteps.length + 1)}
					// label={"Limits Step " + (activitySteps.length + 1)}
					index={activitySteps.length}
					preconditions={activitySteps.at(-1) || workup.starter_conditions || preconditions}
					initialShowForm={true}
					onSave={onSaveStep(activitySteps.length)}
					onCancel={onCancelStep(activitySteps.length)}
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
