import React from 'react'

import VesselableDecorator from '../../../../../decorators/VesselableDecorator';

import InfoLinesBox from './InfoLinesBox';

const DiscardInfo = ({ activity }) => {
	let infoLines = []
	infoLines.push(VesselableDecorator.vesselableSingleLine(activity.reaction_process_vessel?.vessel));

	return (
		<InfoLinesBox title={''} lines={infoLines} />
	)
}

export default DiscardInfo
