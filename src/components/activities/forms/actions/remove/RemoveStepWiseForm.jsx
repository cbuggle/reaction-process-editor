import React from 'react'

import RemoveConditionsFormSet from '../../formsets/RemoveConditionsFormSet';

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
		onWorkupChange({ name: 'starter_conditions', value: value })
	}

	const handleDelete = (name) => () => {
		onWorkupChange({ name: name, value: undefined })
	}

	return (
		<>
			<RemoveConditionsFormSet
				label={"Continuous/Starter"}
				preconditions={preconditions}
				workup={workup.starter_conditions}
				onSave={handleChangeStarterConditions}
				onDelete={handleDelete('starter_conditions')}
				onCancel={()=>{}}
				canDelete
			/>
			<RemoveConditionsFormSet
				key={"limits" + workup.starter_conditions }
				label={"Limits"}
				preconditions={workup.starter_conditions || preconditions}
				workup={workup.limits}
				onSave={handleWorkupChange('limits')}
				onDelete={handleDelete('limits')}
				canDelete
			/>
		</>
	);
};

export default RemoveStepWiseForm
