import React from 'react'

import InfoLinesBox from './InfoLinesBox';

import ActivityInfoDecorator from '../../../../../decorators/ActivityInfoDecorator';
import MetricsDecorator from '../../../../../decorators/MetricsDecorator';
import SamplesDecorator from '../../../../../decorators/SamplesDecorator';

const AddInfo = ({ activity }) => {
	let workup = activity.workup
	let infoTitle = MetricsDecorator.infoLineAmount(workup.target_amount);

	let infoLines = []
	infoLines.push(ActivityInfoDecorator.infoLineAddSampleCondition(workup));
	workup.acts_as === "SOLVENT" && infoLines.push(workup.is_waterfree_solvent ? "waterfree" : "not waterfree");

	const renderSampleSvg = () => workup.acts_as === "SAMPLE" ? SamplesDecorator.sampleSvgImg(activity.sample) : <></>

	return (
		<>
			{renderSampleSvg()}
			{workup.acts_as}
			<InfoLinesBox title={infoTitle} lines={infoLines}  />
		</>
	)
}

export default AddInfo
