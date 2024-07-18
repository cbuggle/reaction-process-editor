import React from 'react'

import DurationSelection from '../../../../utilities/DurationSelection'
import MetricsInput from '../../../../utilities/MetricsInput'

const RemoveConditionsForm = ({
	workup,
	onWorkupChange,
}) => {

	return (
		<>
			<MetricsInput
				metricName={"TEMPERATURE"}
				amount={workup.TEMPERATURE}
				onChange={onWorkupChange('TEMPERATURE')}
			/>
			<MetricsInput
				metricName={"PRESSURE"}
				amount={workup.PRESSURE}
				onChange={onWorkupChange('PRESSURE')}
			/>
			<DurationSelection duration={workup.duration} onChangeDuration={onWorkupChange('duration')} />
		</>
	);
};

export default RemoveConditionsForm



