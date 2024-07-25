import React, { useState } from 'react'

import DurationSelection from '../../../../utilities/DurationSelection'
import MetricsInput from '../../../../utilities/MetricsInput'

const RemoveConditionsForm = ({
	workup,
	conditions,
	onChange,
	onWorkupChange,
}) => {


	const [conditionsForm, setConditionsForm] = useState(conditions || {})

	const handleChange = (name) => (value) => {
		let newConditions = { ...conditionsForm, [name]: value }
		setConditionsForm(newConditions)
		onChange(newConditions)
	}



	return (
		<>
			<MetricsInput
				metricName={"TEMPERATURE"}
				amount={conditionsForm.TEMPERATURE}
				onChange={handleChange('TEMPERATURE')}
			/>
			<MetricsInput
				metricName={"PRESSURE"}
				amount={conditionsForm.PRESSURE}
				onChange={handleChange('PRESSURE')}
			/>
			<DurationSelection duration={conditionsForm.duration} onChangeDuration={handleChange('duration')} />
		</>
	);
};

export default RemoveConditionsForm



