import React from 'react'

import VesselableDecorator from '../../../../../decorators/VesselableDecorator';

import InfoLinesBox from './InfoLinesBox';

const DiscardInfo = ({ activity }) => {
	let workup = activity.workup

	let infoTitle = 'Discard';

	let infoLines = []
	infoLines.push(workup.fractions?.join(", "));

	infoLines.push(VesselableDecorator.vesselableSingleLine(activity.reaction_process_vessel?.vessel));

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} />
	)
}

export default DiscardInfo
