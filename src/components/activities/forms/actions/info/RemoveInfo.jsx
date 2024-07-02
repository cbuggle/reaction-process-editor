import React, { useContext } from 'react'

import InfoLinesBox from './InfoLinesBox';

import ActivityInfoDecorator from '../../../../../decorators/ActivityInfoDecorator';

import { removeFormMetricNames } from '../../../../../constants/metrics';
import { SelectOptions } from "../../../../../contexts/SelectOptions";

const RemoveInfo = ({ activity }) => {

	const selectOptions = useContext(SelectOptions)
	let workup = activity.workup
	let infoTitle = activity.sample_names

	let infoLines = []

	for (let [key, removeWorkup] of Object.entries(workup)) {
		if (removeFormMetricNames.includes(key)) {
			infoLines.push(ActivityInfoDecorator.conditionInfo(removeWorkup, selectOptions));
		}
	}

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} />
	)
}

export default RemoveInfo
