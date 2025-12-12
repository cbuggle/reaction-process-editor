import React from 'react'

const MixingForm = ({ workup, onWorkupChange }) => {

	const handleWorkupChange = (name) => (value) => {
		onWorkupChange({ name: name, value: value });
	}

	return (
		<>
			<handleWorkupChange
				key={'SPEED'}
				metricName={'SPEED'}
				amount={workup.speed}
				onChange={handleWorkupChange('speed')}
			/>
		</>
	)
}

export default MixingForm
