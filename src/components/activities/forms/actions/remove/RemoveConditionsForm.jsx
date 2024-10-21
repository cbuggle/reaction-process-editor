import React from 'react'

import DurationSelection from '../../formgroups/DurationSelection'
import MetricsInputFormGroup from '../../formgroups/MetricsInputFormGroup'

const RemoveConditionsForm = ({
	conditions,
	onChange,
}) => {

	const handleChange = (name) => (value) => {
		let newConditions = { ...conditions, [name]: value }
		onChange(newConditions)
	}

	return (
		<>
			<MetricsInputFormGroup
				metricName={"TEMPERATURE"}
				amount={conditions?.TEMPERATURE}
				onChange={handleChange('TEMPERATURE')}
			/>
			<MetricsInputFormGroup
				metricName={"PRESSURE"}
				amount={conditions?.PRESSURE}
				onChange={handleChange('PRESSURE')}
			/>
			<DurationSelection duration={conditions?.duration} onChangeDuration={handleChange('duration')} />
		</>
	);
};

export default RemoveConditionsForm
