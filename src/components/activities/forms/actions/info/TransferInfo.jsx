import React from 'react'

import InfoLinesBox from './InfoLinesBox';

import MetricsDecorator from '../../../../../decorators/MetricsDecorator';

const TransferInfo = ({ activity }) => {
	let workup = activity.workup
	let infoTitle = activity.sample ?
		activity.sample.intermediate_type + " " + (activity.sample.name || activity.sample.short_label)
		: ""

	let infoLines = []

	infoLines.push(MetricsDecorator.infoLineAmountWithPercentage(workup.target_amount));
	infoLines.push("From: " + activity.transfer_source_step_name);

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} />
	)
}

export default TransferInfo
