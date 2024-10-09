import React, { useState } from 'react'

import DurationSelection from '../../formgroups/DurationSelection'
import MetricsInputFormGroup from '../../formgroups/MetricsInputFormGroup'

const RemoveConditionsForm = ({
	conditions,
	onChange,
}) => {

	const [conditionsForm, setConditionsForm] = useState(conditions || {})

	const handleChange = (name) => (value) => {
		let newConditions = { ...conditionsForm, [name]: value }
		setConditionsForm(newConditions)
		onChange(newConditions)
	}

	return (
		<>
			<MetricsInputFormGroup
				metricName={"TEMPERATURE"}
				amount={conditionsForm.TEMPERATURE}
				onChange={handleChange('TEMPERATURE')}
			/>
			<MetricsInputFormGroup
				metricName={"PRESSURE"}
				amount={conditionsForm.PRESSURE}
				onChange={handleChange('PRESSURE')}
			/>
			<DurationSelection duration={conditionsForm.duration} onChangeDuration={handleChange('duration')} />
		</>
	);
};

export default RemoveConditionsForm
