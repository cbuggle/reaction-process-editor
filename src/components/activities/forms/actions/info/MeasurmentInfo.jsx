import React, { useContext } from 'react'

import InfoLinesBox from './InfoLinesBox';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator'
import PurifyDecorator from '../../../../../decorators/PurifyDecorator'

import { SelectOptions } from "../../../../../contexts/SelectOptions";

const MeasurementInfo = ({ activity }) => {

	let infoTitle = ""
	let infoLines = []
	let workup = activity.workup
	let steps = workup["purify_steps"];

	const purifyOptions = useContext(SelectOptions).measurement[workup.measurement_type];

	const addAutomationToTitle = () => {
		infoTitle += " " + OptionsDecorator.optionToLabel(workup.automation, purifyOptions.automation_modes);
	}

	const addStepsToTitle = () => {
		if (steps) {
			infoTitle += steps.length + " Step";
			if (steps.length > 1) { infoTitle += "s"; }
		}
	}

	const addPurifySolventsToLines = () => {
		infoLines = infoLines.concat(PurifyDecorator.infoLinePurifySolvents(workup, purifyOptions.solvent_options))
	}

	switch (workup.measurement_type) {
		case "CHROMATOGRAPHY":
			addStepsToTitle()
			addAutomationToTitle()
			addPurifySolventsToLines()
			break;
		case "SPECTRONOMY":
			break;
		case "SPECTROSCOPY":
			break;
		default:
			infoTitle = "Error in PurifyInfo: Unknown type: " + workup.measurement_type
			break;
	}

	return (
		<InfoLinesBox title={infoTitle} lines={infoLines} description={workup.description} />
	)
}

export default MeasurementInfo
