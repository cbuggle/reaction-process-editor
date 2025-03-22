import React from 'react'

import VesselableDecorator from '../../../../../decorators/VesselableDecorator';

import InfoLinesBox from './InfoLinesBox';

const EvaporationInfo = ({ activity }) => {
	let workup = activity.workup

	let infoTitle = 'Evaporation';

	let infoLines = []
	infoLines.push(workup.vials?.join(", "));

	infoLines.push(VesselableDecorator.vesselableSingleLine(activity.reaction_process_vessel?.vessel));

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} />
	)
}

export default EvaporationInfo
